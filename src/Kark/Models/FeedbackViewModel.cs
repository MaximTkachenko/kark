using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Kark.Models
{
    public class FeedbackViewModel
    {
        [JsonProperty("submitterEmail")]
        [EmailAddress]
        public string SubmitterEmail { get; set; }

        [JsonProperty("text")]
        [MaxLength(3000)]
        public string Text { get; set; }
    }
}