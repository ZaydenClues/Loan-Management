using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Model
{
    public class ItemsPurchased
    {
        [Key]
        [Column(TypeName = "varchar(6)")]
        public string issue_id { get; set; }

        [Required]
        public string item_description { get; set; }

        [Required]
        public string item_make { get; set; }

        [Required]
        public string item_category { get; set; }

        [Required]
        public int item_valuation { get; set; }


    }
}
