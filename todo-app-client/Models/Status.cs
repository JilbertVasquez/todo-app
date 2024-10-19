using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todo_app_client.Api.Models
{
    [Table("status")]
    public class Status
    {
        [Key]
        public int StatusId { get; set; }

        [Required]
        public string StatusName { get; set; } = default!;

        // Navigation property for the list of todos
        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
    }
}
