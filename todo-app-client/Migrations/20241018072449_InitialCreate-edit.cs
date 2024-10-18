using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_app_client.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateedit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteDate",
                table: "users",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeleteDate",
                table: "users");
        }
    }
}
