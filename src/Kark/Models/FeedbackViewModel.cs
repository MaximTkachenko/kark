using Newtonsoft.Json;

namespace Kark.Models
{
    public class FeedbackViewModel
    {
        [JsonProperty("submitterEmail")]
        public string SubmitterEmail { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }
    }
}