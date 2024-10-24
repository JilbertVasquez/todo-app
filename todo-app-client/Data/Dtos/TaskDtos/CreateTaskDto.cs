using todo_app_client.Api.Data.Dtos.PriorityDtos;
using todo_app_client.Api.Data.Dtos.StatusDtos;

namespace todo_app_client.Api.Data.Dtos.TaskDtos
{
    public class CreateTaskDto
    {
        public int UserId { get; set; } = default!;
        public int TaskId { get; set; } = default!;

        public string Title { get; set; } = default!;

        public string Note { get; set; } = default!;

        public PriorityDto Priority { get; set; } = default!;

        public StatusDto Status { get; set; } = default!;

    }
}