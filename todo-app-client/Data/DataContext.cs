

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
        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            onTodoModelCreating(modelBuilder);
        }

        private void onTodoModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationship between Todo and User
            modelBuilder.Entity<Todo>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId);

            // Configure the relationship between Todo and Priority
            modelBuilder.Entity<Todo>()
                .HasOne(t => t.Priority)
                .WithMany(p => p.Todos)  // Assuming Priority has a collection of Todos
                .HasForeignKey(t => t.PriorityId);

            // Configure the relationship between Todo and Status
            modelBuilder.Entity<Todo>()
                .HasOne(t => t.Status)
                .WithMany(s => s.Todos)  // Assuming Status has a collection of Todos
                .HasForeignKey(t => t.StatusId);
        }
    }
}