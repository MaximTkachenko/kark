using System.ComponentModel.DataAnnotations;

namespace Kark.Web.Models
{
    public class FeedbackViewModel
    {
        [EmailAddress]
        public string SubmitterEmail { get; set; }

        [Required]
        public string Text { get; set; }
    }
}