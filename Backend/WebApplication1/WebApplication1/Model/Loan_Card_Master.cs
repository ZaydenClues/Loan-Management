using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class Loan_Card_Master
    {
        [Key]
        [Column(TypeName = "varchar(6)")]
        public string loan_id { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string loan_type { get; set; }

        [Required]
        public int duration_in_years { get; set; }

        
    }
}
