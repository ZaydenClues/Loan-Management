using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model
{
    public class LoanApply
    {
        [Column(TypeName = "varchar(6)")]
        public string employee_id { get; set; }

        [Column(TypeName = "varchar(6)")]
        public string item_id { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string loan_type { get; set; }


    }
}
