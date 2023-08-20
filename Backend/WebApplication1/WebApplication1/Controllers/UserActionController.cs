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

        [HttpGet("GetLoansPurchased/{id}")]
        public async Task<ActionResult<List<LoansPurchased>>> GetLoansPurchased(string id)
        {
            var loansPurchased = _context.Employee_Card_Details.Where(e => e.Employee.employee_id == id).Join(
                _context.Loan_Card_Master, card => card.loan_Card_Master.loan_id, loan => loan.loan_id,
                (card , loan) => new LoansPurchased()
                {
                    card_id = card.employee_card_id,
                    loan_id = loan.loan_id,
                    duration = loan.duration_in_years,
                    card_issue_date = card.card_issue_date.ToShortDateString(),
                    loan_type=loan.loan_type
                   

                }
                ).ToList();
            return loansPurchased;
        }

    }
}
