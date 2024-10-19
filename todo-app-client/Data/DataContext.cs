

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
            onPriorityModelCreating(modelBuilder);
            onStatusModelCreating(modelBuilder);

        }

        private void onTodoModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>()
            .HasOne(t => t.User)
            .WithMany()
            .HasForeignKey(t => t.UserId);
        }

        private void onPriorityModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>()
            .HasOne(t => t.Priority)
            .WithMany()
            .HasForeignKey(t => t.PriorityId);
        }

         private void onStatusModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>()
            .HasOne(t => t.Status)
            .WithMany()
            .HasForeignKey(t => t.StatusId);
        }
    }
}