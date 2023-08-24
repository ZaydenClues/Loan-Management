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
            var itemsPurchased = _context.Employee_Issue_Details.Where(e => e.Employee.employee_id == id)
                .Select(e => new ItemsPurchased()
                {
                    issue_id = e.issue_id,
                    item_description = e.Item.item_description,
                    item_category = e.Item.item_category,
                    item_make = e.Item.item_make,
                    item_valuation = e.Item.item_valuation,
                }).ToList();

            return itemsPurchased;
        }

        private bool checkActive(DateTime issueDate, string loan_id)
        {
            var duration = _context.Loan_Card_Master.Where(c => c.loan_id == loan_id).ToList()[0].duration_in_years;
            return DateTime.Now > issueDate.AddYears(duration) && duration > 0;
        }

        [HttpGet("GetLoansPurchased/{id}")]
        public async Task<ActionResult<List<LoansPurchased>>> GetLoansPurchased(string id)
        {
            var loansPurchased = _context.Employee_Card_Details.Where(e => e.Employee.employee_id == id && checkActive(e.card_issue_date,e.loan_id)).Join(
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
