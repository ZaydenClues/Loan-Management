using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model
{
    public class ApplyLoanRequest
    {
        [Key]
        public string employee_id { get; set; }

        [Required]
        public string item_category { get; set; }

        [Required]
        public string item_id { get; set; }
    }
}
