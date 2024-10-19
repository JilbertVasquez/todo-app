namespace todo_app_client.Api.Data.Dtos.UserDtos
{
    public class LoginUserDto
    {
        public string Username { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}