using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Web.Http.Results;
using WebApplication1.Model;

namespace WebApplication1.Services.EmployeeServices
{
    public class EmployeeService : IEmployeeService
    {
        private readonly APIDbContext _context;
        public EmployeeService(APIDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                throw new Exception($"Not Found");
            }
            return await _context.Employees.ToListAsync();
        }

        public async Task<IActionResult> Login(LoginRequest request)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(u => u.employee_id == request.id);
            if (employee == null)
            {
                throw new Exception("User not found.");
            }

            if (!VerifyPasswordHash(request.password, employee.PasswordHash, employee.PasswordSalt))
            {
                throw new Exception("Password is incorrect.");
            }

            return new OkObjectResult(employee);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
