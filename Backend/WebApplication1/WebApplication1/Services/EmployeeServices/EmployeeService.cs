using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http.Results;
using WebApplication1.Model;

namespace WebApplication1.Services.EmployeeServices
{
    public class EmployeeService : IEmployeeService
    {
        private readonly APIDbContext _context;

        private IConfiguration _config;
        public EmployeeService(APIDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                throw new Exception($"Not Found");
            }
            return await _context.Employees.ToListAsync();
        }

        public async Task<IActionResult> Login(EmployeeCreds request)
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

            var tokenString = GenerateJSONWebToken(request);

            Console.WriteLine(_config["Jwt:Key"]);
            var response = new { employee = employee, token = tokenString };


            return new OkObjectResult(response);
        }

        private string GenerateJSONWebToken(EmployeeCreds request)
        {
            Console.WriteLine(_config["Jwt:Key"]);
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                null,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
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
