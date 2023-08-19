using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model;

namespace WebApplication1.Services.EmployeeServices
{
    public interface IEmployeeService
    {
        Task<ActionResult<IEnumerable<Employee>>> GetEmployees();
        Task<IActionResult> Login(EmployeeCreds request);
    }
}
