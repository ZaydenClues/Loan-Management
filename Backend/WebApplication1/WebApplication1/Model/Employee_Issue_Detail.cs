using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model
{
    public class Employee_Issue_Detail
    {
        [Key]
        
        [Column(TypeName = "varchar(6)")]
        public string issue_id { get; set; }

        public Employee Employee { get; set; }
        public Item Item { get; set; }


        [Required]
        [Column(TypeName = "Date")]
        public DateTime issue_date { get; set; }

        [Required]
        [Column(TypeName = "Date")]
        public DateTime return_date { get; set; }

    }
}
