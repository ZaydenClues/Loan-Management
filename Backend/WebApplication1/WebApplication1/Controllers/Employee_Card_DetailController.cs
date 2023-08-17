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
    public class Employee_Card_DetailController : ControllerBase
    {
        private readonly APIDbContext _context;

        public Employee_Card_DetailController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee_Card_Detail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee_Card_Detail>>> GetEmployee_Card_Details()
        {
          if (_context.Employee_Card_Details == null)
          {
              return NotFound();
          }
            return await _context.Employee_Card_Details.ToListAsync();
        }

        // GET: api/Employee_Card_Detail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee_Card_Detail>> GetEmployee_Card_Detail(string id)
        {
          if (_context.Employee_Card_Details == null)
          {
              return NotFound();
          }
            var employee_Card_Detail = await _context.Employee_Card_Details.FindAsync(id);

            if (employee_Card_Detail == null)
            {
                return NotFound();
            }

            return employee_Card_Detail;
        }

        // PUT: api/Employee_Card_Detail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee_Card_Detail(string id, Employee_Card_Detail employee_Card_Detail)
        {
            if (id != employee_Card_Detail.employee_card_id)
            {
                return BadRequest();
            }

            _context.Entry(employee_Card_Detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Employee_Card_DetailExists(id))
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

        // POST: api/Employee_Card_Detail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee_Card_Detail>> PostEmployee_Card_Detail(Employee_Card_Detail employee_Card_Detail)
        {
          if (_context.Employee_Card_Details == null)
          {
              return Problem("Entity set 'APIDbContext.Employee_Card_Details'  is null.");
          }
            _context.Employee_Card_Details.Add(employee_Card_Detail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Employee_Card_DetailExists(employee_Card_Detail.employee_card_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployee_Card_Detail", new { id = employee_Card_Detail.employee_card_id }, employee_Card_Detail);
        }

        // DELETE: api/Employee_Card_Detail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee_Card_Detail(string id)
        {
            if (_context.Employee_Card_Details == null)
            {
                return NotFound();
            }
            var employee_Card_Detail = await _context.Employee_Card_Details.FindAsync(id);
            if (employee_Card_Detail == null)
            {
                return NotFound();
            }

            _context.Employee_Card_Details.Remove(employee_Card_Detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Employee_Card_DetailExists(string id)
        {
            return (_context.Employee_Card_Details?.Any(e => e.employee_card_id == id)).GetValueOrDefault();
        }
    }
}
