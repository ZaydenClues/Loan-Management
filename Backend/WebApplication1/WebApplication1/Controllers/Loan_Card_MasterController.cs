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
    public class Loan_Card_MasterController : ControllerBase
    {
        private readonly APIDbContext _context;

        public Loan_Card_MasterController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Loan_Card_Master
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan_Card_Master>>> GetLoan_Card_Master()
        {
          if (_context.Loan_Card_Master == null)
          {
              return NotFound();
          }
            return await _context.Loan_Card_Master.ToListAsync();
        }

        // GET: api/Loan_Card_Master/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Loan_Card_Master>> GetLoan_Card_Master(string id)
        {
          if (_context.Loan_Card_Master == null)
          {
              return NotFound();
          }
            var loan_Card_Master = await _context.Loan_Card_Master.FindAsync(id);

            if (loan_Card_Master == null)
            {
                return NotFound();
            }

            return loan_Card_Master;
        }

        // PUT: api/Loan_Card_Master/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoan_Card_Master(string id, Loan_Card_Master loan_Card_Master)
        {
            if (id != loan_Card_Master.loan_id)
            {
                return BadRequest();
            }

            _context.Entry(loan_Card_Master).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Loan_Card_MasterExists(id))
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

        // POST: api/Loan_Card_Master
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Loan_Card_Master>> PostLoan_Card_Master(Loan_Card_Master loan_Card_Master)
        {
          if (_context.Loan_Card_Master == null)
          {
              return Problem("Entity set 'APIDbContext.Loan_Card_Master'  is null.");
          }
            _context.Loan_Card_Master.Add(loan_Card_Master);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Loan_Card_MasterExists(loan_Card_Master.loan_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLoan_Card_Master", new { id = loan_Card_Master.loan_id }, loan_Card_Master);
        }

        // DELETE: api/Loan_Card_Master/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan_Card_Master(string id)
        {
            if (_context.Loan_Card_Master == null)
            {
                return NotFound();
            }
            var loan_Card_Master = await _context.Loan_Card_Master.FindAsync(id);
            if (loan_Card_Master == null)
            {
                return NotFound();
            }

            _context.Loan_Card_Master.Remove(loan_Card_Master);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Loan_Card_MasterExists(string id)
        {
            return (_context.Loan_Card_Master?.Any(e => e.loan_id == id)).GetValueOrDefault();
        }
    }
}
