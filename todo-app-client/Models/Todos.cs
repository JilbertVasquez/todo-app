using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todo_app_client.Api.Models
{
    [Table("todos")]
    public class Todo
    {
        [Key]
        public int TodoId { get; set; }

        [Required]
        public int UserId { get; set; }

        public User User { get; set; } = default!;

        [Required]
        public string Title { get; set; } = default!;

        [Required]
        public string Note { get; set; } = default!;

        [Required]
        public int PriorityId { get; set; }

        public Priority Priority { get; set; } = default!;

        [Required]
        public int StatusId { get; set; }

        public Status Status { get; set; } = default!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsDeleted { get; set; } = false;

        public DateTime? DeletedAt { get; set; }
    }
}
