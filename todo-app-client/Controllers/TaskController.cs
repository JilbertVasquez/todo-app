
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;
using todo_app_client.Api.Data.Dtos.TaskDtos;
using todo_app_client.Api.Models;

namespace todo_app_client.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

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
                PriorityId = taskDto.PriorityId,
                StatusId = taskDto.StatusId,
                CreatedAt = DateTime.UtcNow
            };

            _db.Todos.Add(todo);
            await _db.SaveChangesAsync(); 
            
            return Ok();
        }

        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Todo>>>  GetTaskList([FromQuery] int userId)
        {
            if (userId <= 0)
            {
                return BadRequest("Invalid userId");
            }

            var tasks = await _db.Todos
            .Where(t => !t.IsDeleted)
            .Select(t => new TaskListDto
            {
                TaskId = t.TodoId,
                Title = t.Title,
                Note = t.Note!,
                PriorityId = t.PriorityId,
                StatusId = t.StatusId
            })
            .ToListAsync();

        return Ok(tasks);
        }
    }
}