using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_app_client.Migrations
{
    /// <inheritdoc />
    public partial class UsersPriorityStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_todos_priorities_PriorityId",
                table: "todos");

            migrationBuilder.DropForeignKey(
                name: "FK_todos_priorities_PriorityId1",
                table: "todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_priorities",
                table: "priorities");

            migrationBuilder.RenameTable(
                name: "priorities",
                newName: "Priorities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Priorities",
                table: "Priorities",
                column: "PriorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_todos_Priorities_PriorityId",
                table: "todos",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "PriorityId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_todos_Priorities_PriorityId1",
                table: "todos",
                column: "PriorityId1",
                principalTable: "Priorities",
                principalColumn: "PriorityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_todos_Priorities_PriorityId",
                table: "todos");

            migrationBuilder.DropForeignKey(
                name: "FK_todos_Priorities_PriorityId1",
                table: "todos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Priorities",
                table: "Priorities");

            migrationBuilder.RenameTable(
                name: "Priorities",
                newName: "priorities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_priorities",
                table: "priorities",
                column: "PriorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_todos_priorities_PriorityId",
                table: "todos",
                column: "PriorityId",
                principalTable: "priorities",
                principalColumn: "PriorityId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_todos_priorities_PriorityId1",
                table: "todos",
                column: "PriorityId1",
                principalTable: "priorities",
                principalColumn: "PriorityId");
        }
    }
}
