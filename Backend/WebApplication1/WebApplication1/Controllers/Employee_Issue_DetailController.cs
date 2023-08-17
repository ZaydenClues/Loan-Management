using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Employee_Issue_DetailController : ControllerBase
    {
        private readonly APIDbContext _context;

        public Employee_Issue_DetailController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee_Issue_Detail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee_Issue_Detail>>> GetEmployee_Issue_Details()
        {
          if (_context.Employee_Issue_Details == null)
          {
              return NotFound();
          }
            return await _context.Employee_Issue_Details.ToListAsync();
        }

        // GET: api/Employee_Issue_Detail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee_Issue_Detail>> GetEmployee_Issue_Detail(string id)
        {
          if (_context.Employee_Issue_Details == null)
          {
              return NotFound();
          }
            var employee_Issue_Detail = await _context.Employee_Issue_Details.FindAsync(id);

            if (employee_Issue_Detail == null)
            {
                return NotFound();
            }

            return employee_Issue_Detail;
        }

        // PUT: api/Employee_Issue_Detail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee_Issue_Detail(string id, Employee_Issue_Detail employee_Issue_Detail)
        {
            if (id != employee_Issue_Detail.issue_id)
            {
                return BadRequest();
            }

            _context.Entry(employee_Issue_Detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Employee_Issue_DetailExists(id))
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

        // POST: api/Employee_Issue_Detail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee_Issue_Detail>> PostEmployee_Issue_Detail(Employee_Issue_Detail employee_Issue_Detail)
        {
          if (_context.Employee_Issue_Details == null)
          {
              return Problem("Entity set 'APIDbContext.Employee_Issue_Details'  is null.");
          }
            _context.Employee_Issue_Details.Add(employee_Issue_Detail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Employee_Issue_DetailExists(employee_Issue_Detail.issue_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployee_Issue_Detail", new { id = employee_Issue_Detail.issue_id }, employee_Issue_Detail);
        }

        // DELETE: api/Employee_Issue_Detail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee_Issue_Detail(string id)
        {
            if (_context.Employee_Issue_Details == null)
            {
                return NotFound();
            }
            var employee_Issue_Detail = await _context.Employee_Issue_Details.FindAsync(id);
            if (employee_Issue_Detail == null)
            {
                return NotFound();
            }

            _context.Employee_Issue_Details.Remove(employee_Issue_Detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Employee_Issue_DetailExists(string id)
        {
            return (_context.Employee_Issue_Details?.Any(e => e.issue_id == id)).GetValueOrDefault();
        }
    }
}
