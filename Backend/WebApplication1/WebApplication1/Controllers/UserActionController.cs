using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserActionController : Controller
    {
        private readonly APIDbContext _context;

        public UserActionController(APIDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetItemsPurchased/{id}")]
        public async Task<ActionResult<List<ItemsPurchased>>> GetItemsPurchased(string id)
        {
            var itemsPurchased = _context.Employee_Issue_Details.Where(e => e.Employee.employee_id == id).Join(
                _context.Items, issue => issue.Item.item_id, item => item.item_id,
                (issue, item) => new ItemsPurchased()
                {
                    issue_id = issue.issue_id,
                    item_category = item.item_category,
                    item_description = item.item_description,
                    item_make = item.item_make,
                    item_valuation = item.item_valuation

                }
                ).ToList();
            return itemsPurchased;
        }

    }
}
