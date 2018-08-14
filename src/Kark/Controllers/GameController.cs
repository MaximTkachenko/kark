using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Kark.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Kark.Controllers
{
    public class GameController : Controller
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<GameController> _logger;

        public GameController(IOptions<EmailSettings> emailOptions, ILogger<GameController> logger)
        {
            _emailSettings = emailOptions.Value;
            _logger = logger;
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
                try
                {
                    using (var smtp = new SmtpClient
                    {
                        Host = _emailSettings.SmtpServer,
                        Port = _emailSettings.SmtpPort,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(_emailSettings.From, _emailSettings.Password)
                    })
                    using (var message = new MailMessage(_emailSettings.From, _emailSettings.To)
                    {
                        Subject = "Kark feedback",
                        Body =
                            $"FROM:{Environment.NewLine}{feedbackModel.SubmitterEmail}{Environment.NewLine}TEXT:{Environment.NewLine}{feedbackModel.Text}"
                    })
                    {
                        smtp.Send(message);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send Kark feedback");
                }
            });

            return Json(new { });
        }
    }
}