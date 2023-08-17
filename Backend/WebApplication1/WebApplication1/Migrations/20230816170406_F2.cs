using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class F2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Employee_Card_Details",
                table: "Employee_Card_Details");

            migrationBuilder.AddColumn<string>(
                name: "employee_card_id",
                table: "Employee_Card_Details",
                type: "varchar(6)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employee_Card_Details",
                table: "Employee_Card_Details",
                column: "employee_card_id");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Card_Details_employee_id",
                table: "Employee_Card_Details",
                column: "employee_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Employee_Card_Details",
                table: "Employee_Card_Details");

            migrationBuilder.DropIndex(
                name: "IX_Employee_Card_Details_employee_id",
                table: "Employee_Card_Details");

            migrationBuilder.DropColumn(
                name: "employee_card_id",
                table: "Employee_Card_Details");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employee_Card_Details",
                table: "Employee_Card_Details",
                column: "employee_id");
        }
    }
}
