using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todo_app_client.Api.Models
{
    [Table("Priority")]
    public class Priority
    {
        [Key]
        public int PriorityId { get; set; }

        [Required]
        public string PriorityName { get; set; } = default!;

        // Navigation property for the list of todos
        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
    }
}
