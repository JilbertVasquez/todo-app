
using System.ComponentModel.DataAnnotations;

namespace todo_app_client.Api.Data.Dtos.UserDtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Firstname { get; set; } = default!;
        
        [Required]
        public string Lastname { get; set; } = default!;

        [Required, MinLength(3)]
        public string Username { get; set; } = default!;

        [Required, MinLength(8)]
        public string Password { get; set; } = default!;

        [Required, EmailAddress]
        public string Email { get; set; } = default!;
    }
}