using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class _ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(6)", nullable: false),
                    name = table.Column<string>(type: "varchar(20)", nullable: false),
                    designation = table.Column<string>(type: "varchar(25)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    employee_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    employee_name = table.Column<string>(type: "varchar(20)", nullable: false),
                    designation = table.Column<string>(type: "varchar(25)", nullable: false),
                    department = table.Column<string>(type: "varchar(25)", nullable: false),
                    gender = table.Column<string>(type: "varchar(1)", nullable: false),
                    date_of_birth = table.Column<DateTime>(type: "Date", nullable: false),
                    date_of_joining = table.Column<DateTime>(type: "Date", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.employee_id);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    item_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    item_description = table.Column<string>(type: "varchar(25)", nullable: false),
                    item_status = table.Column<string>(type: "char(1)", nullable: false),
                    item_make = table.Column<string>(type: "varchar(25)", nullable: false),
                    item_category = table.Column<string>(type: "varchar(20)", nullable: false),
                    item_valuation = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.item_id);
                });

            migrationBuilder.CreateTable(
                name: "Loan_Card_Master",
                columns: table => new
                {
                    loan_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    loan_type = table.Column<string>(type: "varchar(15)", nullable: false),
                    duration_in_years = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loan_Card_Master", x => x.loan_id);
                });

            migrationBuilder.CreateTable(
                name: "Employee_Issue_Details",
                columns: table => new
                {
                    issue_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    employee_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    item_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    issue_date = table.Column<DateTime>(type: "Date", nullable: false),
                    return_date = table.Column<DateTime>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee_Issue_Details", x => x.issue_id);
                    table.ForeignKey(
                        name: "FK_Employee_Issue_Details_Employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "Employees",
                        principalColumn: "employee_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employee_Issue_Details_Items_item_id",
                        column: x => x.item_id,
                        principalTable: "Items",
                        principalColumn: "item_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employee_Card_Details",
                columns: table => new
                {
                    employee_card_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    loan_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    employee_id = table.Column<string>(type: "varchar(6)", nullable: false),
                    card_issue_date = table.Column<DateTime>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee_Card_Details", x => x.employee_card_id);
                    table.ForeignKey(
                        name: "FK_Employee_Card_Details_Employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "Employees",
                        principalColumn: "employee_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employee_Card_Details_Loan_Card_Master_loan_id",
                        column: x => x.loan_id,
                        principalTable: "Loan_Card_Master",
                        principalColumn: "loan_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Card_Details_employee_id",
                table: "Employee_Card_Details",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Card_Details_loan_id",
                table: "Employee_Card_Details",
                column: "loan_id");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Issue_Details_employee_id",
                table: "Employee_Issue_Details",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_Issue_Details_item_id",
                table: "Employee_Issue_Details",
                column: "item_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Employee_Card_Details");

            migrationBuilder.DropTable(
                name: "Employee_Issue_Details");

            migrationBuilder.DropTable(
                name: "Loan_Card_Master");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Items");
        }
    }
}
