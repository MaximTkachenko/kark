using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Kark.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Kark.Controllers
{
    public class GameController : Controller
    {
        private readonly EmailSettings _emailSettings;

        public GameController(IOptions<EmailSettings> emailOptions)
        {
            _emailSettings = emailOptions.Value;
        }

        [HttpGet("/")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("/feedback")]
        public IActionResult Feedback(FeedbackViewModel feedbackModel)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { });
            }

            Task.Run(() =>
            {
                var smtp = new SmtpClient
                {
                    Host = _emailSettings.SmtpServer,
                    Port = _emailSettings.SmtpPort,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(_emailSettings.From, _emailSettings.Password)
                };
                using (var message = new MailMessage(_emailSettings.From, _emailSettings.To)
                {
                    Subject = "Kark feedback",
                    Body = $"FROM:{Environment.NewLine}{feedbackModel.SubmitterEmail}{Environment.NewLine}TEXT:{Environment.NewLine}{feedbackModel.Text}"
                })
                {
                    smtp.Send(message);
                }
            });

            return Json(new { });
        }
    }
}