using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class Item
    {
        [Key]
        [Column(TypeName = "varchar(6)")]
        public string item_id { get; set; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string item_description { get; set; }

        [Required]
        [Column(TypeName = "char(1)")]
        public string item_status { get; set; }

        [Required]
        [Column(TypeName = "varchar(25)")]
        public string item_make { get; set; }

        [Required]
        [Column(TypeName = "varchar(20)")]
        public string item_category { get; set; }

        [Required]
        public int item_valuation { get; set; }
    }
}
