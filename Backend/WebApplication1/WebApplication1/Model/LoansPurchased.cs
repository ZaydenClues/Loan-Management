using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class LoansPurchased
    {
        [Key]
        [Column(TypeName = "varchar(6)")]
        public string card_id { get; set; }

        [Required]
        public string loan_id { get; set; }

        [Required]
        public int duration { get; set; }

        [Required]
        public string card_issue_date { get; set; }

        [Required]
        public string loan_type { get; set; }

        

    }
}
