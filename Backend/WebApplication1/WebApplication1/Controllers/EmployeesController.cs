using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;
using System.Web.Http.Cors;
using Azure.Core;
using System.Security.Cryptography;
using WebApplication1.Services.EmployeeServices;

namespace loanApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly APIDbContext _context;
        private readonly IEmployeeService employeeService;

        public EmployeesController(APIDbContext context,IEmployeeService employeeService)
        {
            _context = context;
            this.employeeService = employeeService;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {

            try
            {
                return await employeeService.GetEmployees();
            }
            catch (Exception ex) {

                return NotFound(ex.Message);
            }
         
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(string id)
        {
          if (_context.Employees == null)
          {
              return NotFound();
          }
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            
            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(string id, Employee employee)
        {
            if (id != employee.employee_id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("updatePassword")]
        public async Task<IActionResult> UpdatePassword(EmployeeCreds employeeCreds)
        {
            if(_context.Employees == null)
            {
                return NotFound();
            }
            var employee = _context.Employees.Find(employeeCreds.id);
            if (employee == null)
            {
                return NotFound();
            }

            CreatePasswordHash(employeeCreds.password, out byte[] passwordHash, out byte[] passwordSalt);

            employee.PasswordHash = passwordHash;
            employee.PasswordSalt = passwordSalt;

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(employeeCreds.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(EmployeeCreds request)
        {
            try
            {
                return await employeeService.Login(request);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            

            //return Ok(employee);
            //return CreatedAtAction("GetEmployee", new { id = employee.employee_id }, employee);
            //return Ok($"Welcome back, {employee.employee_name}! :)");
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(EmployeeRegistration employee)
        {
          if (_context.Employees == null)
          {
              return Problem("Entity set 'APIDbContext.Employees'  is null.");
            }


          //
            if (_context.Employees.Any(u => u.employee_id == employee.employee_id))
            {
                return BadRequest("User already exists.");
            }

            //

            CreatePasswordHash(employee.password,out byte[] passwordHash,out byte[] passwordSalt);


            employee.PasswordSalt = passwordSalt;
            employee.PasswordHash = passwordHash;



            _context.Employees.Add(employee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeeExists(employee.employee_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            //return CreatedAtAction("GetEmployee", new { id = employee.employee_id }, employee);
            return Ok("Account Created Successfully !!");
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(string id)
        {
            return (_context.Employees?.Any(e => e.employee_id == id)).GetValueOrDefault();
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
