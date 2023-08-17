using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class LoginRequest
    {

        [Required]
        public string id { get; set; } = string.Empty;
        [Required]
        public string password { get; set; } = string.Empty;
    }



}
