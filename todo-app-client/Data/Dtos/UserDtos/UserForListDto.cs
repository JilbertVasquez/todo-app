namespace todo_app_client.Api.Data.Dtos
{
    public class UserForListDto
    {
        public int UserId { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
    }
}