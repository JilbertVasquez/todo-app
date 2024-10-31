
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.PriorityDtos;
using todo_app_client.Api.Data.Dtos.StatusDtos;
using todo_app_client.Api.Data.Dtos.TaskDtos;
using todo_app_client.Api.Models;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class TaskController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _db;

        public TaskController(
            IMapper mapper,
            DataContext db
        )
        {
            _mapper = mapper;
            _db = db;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Todo>> CreateTask(CreateTaskDto taskDto)
        {
            var todo = new Todo
            {
                UserId = taskDto.UserId,
                Title = taskDto.Title,
                Note = taskDto.Note,
                PriorityId = taskDto.Priority.PriorityId,
                StatusId = taskDto.Status.StatusId,
                CreatedAt = DateTime.UtcNow
            };

            _db.Todos.Add(todo);
            await _db.SaveChangesAsync(); 
            
            return Ok(true);
        }

        [HttpPost("list")]
        public async Task<ActionResult<IEnumerable<Todo>>>  GetTaskList([FromBody] UserIdDto userId)
        {
            if (userId.UserId <= 0)
            {
                return BadRequest("Invalid userId");
            }

            var tasks = await _db.Todos
            .Where(t => t.UserId == userId.UserId && !t.IsDeleted)
            .Include(t => t.Priority)
            .Include(t => t.Status)
            .Select(t => new TaskListDto
            {
                TaskId = t.TodoId,
                Title = t.Title,
                Note = t.Note!,
                PriorityId = t.PriorityId,
                PriorityName = t.Priority.PriorityName,
                StatusId = t.StatusId,
                StatusName = t.Status.StatusName,
            })
            .ToListAsync();

        return Ok(tasks);
        }

        [HttpGet("task-details")]
        public async Task<IActionResult> TaskDetails([FromQuery] int taskId)
        {
            var task = await _db.Todos
                .Where(t => t.TodoId == taskId && !t.IsDeleted)
                .Include(t => t.Priority)
                .Include(t => t.Status)
                .Select(t => new TaskDetailsDto
                {
                    TaskId = t.TodoId,
                    Title = t.Title,
                    Note = t.Note,
                    Priority = new PriorityDto
                    {
                        PriorityId = t.PriorityId,
                        PriorityName = t.Priority.PriorityName
                    },
                    Status = new StatusDto
                    {
                        StatusId = t.StatusId,
                        StatusName = t.Status.StatusName
                    }
                })
                .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound();
            }



            return Ok(task);
        }

        [HttpPut("edit/{taskId}")]
        public async Task<IActionResult> EditTask(int taskId, [FromBody] UpdateTaskDto taskDto)
        {
            // Find the task by TaskId
            var task = await _db.Todos.FindAsync(taskId);

            if (task == null || task.IsDeleted)
            {
                return NotFound();
            }

            // Update task properties
            task.Title = taskDto.Title;
            task.Note = taskDto.Note;
            task.PriorityId = taskDto.Priority.PriorityId;
            task.StatusId = taskDto.Status.StatusId;

            // Save changes to the database
            await _db.SaveChangesAsync();

            return Ok(true);
        }

        [HttpDelete("delete/{taskId}")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            var task = await _db.Todos.FindAsync(taskId);
            
            if (task == null || task.IsDeleted)
            {
                return NotFound();
            }

            task.IsDeleted = true;
            task.DeletedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return Ok(true);
        }
    }
}