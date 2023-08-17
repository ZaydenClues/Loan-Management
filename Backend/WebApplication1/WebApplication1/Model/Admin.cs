using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace WebApplication1.Model
{
    public class Admin
    {

        [Key]
        [Column(TypeName = "varchar(6)")]

        public string id { get; set; } = "admin";


        [Column(TypeName = "varchar(20)")]
        public string name { get; set; } = "admin";


        [Column(TypeName = "varchar(25)")]
        public string designation { get; set; } = "admin";

        [JsonIgnore]
        public string password { get; set; } = "admin";

    }
}
