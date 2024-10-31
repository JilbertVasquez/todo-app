
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using todo_app_client.Api.Data.Dtos.UserDtos;

namespace todo_app_client.Api.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

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

        public string Role { get; set; } = default!;

        public DateTime? CreateDate { get; set; }

        public DateTime? DeleteDate { get; set; }

        public User()
        {

        }

        public User(RegisterUserDto dto) 
        {
            Firstname = dto.Firstname;
            Lastname = dto.Lastname;
            Username = dto.Username;
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password, 11);
            Email = dto.Email;
            Role = "User";
            CreateDate = DateTime.Today;
        }
    }
}