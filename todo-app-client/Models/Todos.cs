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

        [ForeignKey("UserId")]
        public User User { get; set; } = default!;

        [Required]
        public string Title { get; set; } = default!;

        public string? Note { get; set; }

        [Required]
        public int PriorityId { get; set; }

        [ForeignKey("PriorityId")]
        public Priority Priority { get; set; } = default!;

        [Required]
        public int StatusId { get; set; }

        [ForeignKey("StatusId")]
        public Status Status { get; set; } = default!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsDeleted { get; set; } = false;

        public DateTime? DeletedAt { get; set; }
    }
}
