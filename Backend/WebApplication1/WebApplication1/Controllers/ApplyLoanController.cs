using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplyLoanController : Controller
    {
        private readonly APIDbContext _context;

        public ApplyLoanController(APIDbContext context)
        {
            _context = context;
        }

        private static Random random = new Random();

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpGet("GetItems")]
        public async Task<ActionResult<IEnumerable<Item>>> GetAllItems()
        {
            if(_context.Items == null)
            {
                return NotFound();
            }
            return _context.Items.ToList();
        }

        [HttpGet("GetLoanCardData")]
        public async Task<ActionResult<IEnumerable<Loan_Card_Master>>> GetLoanCards()
        {
            if(_context.Loan_Card_Master == null)
            {
                return NotFound();
            }
            return _context.Loan_Card_Master.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<ApplyLoanRequest>> ApplyLoan(ApplyLoanRequest request) 
        {
            var loanDetails = _context.Loan_Card_Master.Where(e => e.loan_type == request.item_category).ToList()[0];

            if(loanDetails == null)
            {
                return NotFound();
            }

            DateTime issueTime = DateTime.Now;

            Employee_Card_Detail cardDetail = new Employee_Card_Detail();
            int cards;
            if (_context.Employee_Card_Details == null)
            {
                cards = 0;
            }
            else
            {
                cards = _context.Employee_Card_Details.ToList().Count();
            }
            
            cardDetail.employee_card_id = request.employee_id.ToString() + (cards+1).ToString();
            cardDetail.loan_id = loanDetails.loan_id;
            cardDetail.Employee = await _context.Employees.FindAsync(request.employee_id);
            cardDetail.loan_Card_Master = await _context.Loan_Card_Master.FindAsync(loanDetails.loan_id);
            cardDetail.card_issue_date = issueTime;

            if (_context.Employee_Card_Details == null)
            {
                return Problem("Entity set 'APIDbContext.Employee_Card_Details'  is null.");
            }

            _context.Employee_Card_Details.Add(cardDetail);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest("failed");
            }

            Employee_Issue_Detail employee_Issue_Detail = new Employee_Issue_Detail();
            int issues;
            if(_context.Employee_Issue_Details == null)
            {
                issues = 0;
            }
            else
            {
                issues = _context.Employee_Issue_Details.ToList().Count();
            }
            employee_Issue_Detail.issue_date = issueTime;
            employee_Issue_Detail.issue_id = request.employee_id.ToString() + (issues+1).ToString();
            employee_Issue_Detail.Employee = await _context.Employees.FindAsync(request.employee_id);
            employee_Issue_Detail.Item = await _context.Items.FindAsync(request.item_id);
            employee_Issue_Detail.return_date = issueTime.AddYears(loanDetails.duration_in_years);

            if (_context.Employee_Issue_Details == null)
            {
                return Problem("Entity set 'APIDbContext.Employee_Issue_Details'  is null.");
            }

            _context.Employee_Issue_Details.Add(employee_Issue_Detail);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }

            return NoContent();

    }
    }

  
}
