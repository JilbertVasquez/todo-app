

using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Models;

namespace todo_app_client.Api.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}