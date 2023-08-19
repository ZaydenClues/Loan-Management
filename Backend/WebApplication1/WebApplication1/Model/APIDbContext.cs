using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Model
{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions option) : base(option)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Employee_Issue_Detail> Employee_Issue_Details { get; set; }
        public DbSet<Loan_Card_Master> Loan_Card_Master { get; set; }
        public DbSet<Employee_Card_Detail> Employee_Card_Details { get; set; }

        public DbSet<Admin> Admin { get; set; }

    }
}