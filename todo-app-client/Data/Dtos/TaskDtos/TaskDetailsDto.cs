namespace todo_app_client.Api.Data.Dtos.TaskDtos
{
    using todo_app_client.Api.Data.Dtos.PriorityDtos;
    using todo_app_client.Api.Data.Dtos.StatusDtos;

    public class TaskDetailsDto
    {
        public int TaskId { get; set; } = default!;

        public string Title { get; set; } = default!;

        public string Note { get; set; } = default!;

        public StatusDto Status { get; set; } = default!;
        public PriorityDto Priority { get; set; } = default!;
    }
}