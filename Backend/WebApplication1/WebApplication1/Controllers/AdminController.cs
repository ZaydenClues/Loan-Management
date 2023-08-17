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
    public class AdminController : ControllerBase
    {
        private readonly APIDbContext _context;

        public AdminController(APIDbContext context)
        {
            _context = context;
        }

        // GET: api/Admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmin()
        {
          if (_context.Admin == null)
          {
              return NotFound();
          }
            return await _context.Admin.ToListAsync();
        }

        // GET: api/Admin/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(string id)
        {
          if (_context.Admin == null)
          {
              return NotFound();
          }
            var admin = await _context.Admin.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var admin = await _context.Admin.FirstOrDefaultAsync(u => u.id == request.id);
            if (admin == null)
            {
                return BadRequest("User not found.");
            }




           // return CreatedAtAction("GetEmployee", new { id = admin.id }, admin);
            return Ok(admin);
        }

        // PUT: api/Admin/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(string id, Admin admin)
        {
            if (id != admin.id)
            {
                return BadRequest();
            }

            _context.Entry(admin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
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

        // POST: api/Admin
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
        {
          if (_context.Admin == null)
          {
              return Problem("Entity set 'APIDbContext.Admin'  is null.");
          }
            _context.Admin.Add(admin);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AdminExists(admin.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAdmin", new { id = admin.id }, admin);
        }

        // DELETE: api/Admin/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(string id)
        {
            if (_context.Admin == null)
            {
                return NotFound();
            }
            var admin = await _context.Admin.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            _context.Admin.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminExists(string id)
        {
            return (_context.Admin?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
