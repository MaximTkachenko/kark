﻿using System.Collections.Specialized;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Kark.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;

namespace Kark.Controllers
{
    public class GameController : Controller
    {
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

            //Task.Run(() =>
            //{
            //    NameValueCollection settings = ConfigurationManager<>.AppSettings;

            //    var fromAddress = new MailAddress(settings["FEEDBACK:fromEmail"]);
            //    var toAddress = new MailAddress(settings["FEEDBACK:toEmail"]);

            //    var smtp = new SmtpClient
            //    {
            //        Host = settings["FEEDBACK:smtpServer"],
            //        Port = int.Parse(settings["FEEDBACK:smtpPort"]),
            //        EnableSsl = true,
            //        DeliveryMethod = SmtpDeliveryMethod.Network,
            //        UseDefaultCredentials = false,
            //        Credentials = new NetworkCredential(fromAddress.Address, settings["FEEDBACK:fromPassword"])
            //    };
            //    using (var message = new MailMessage(fromAddress, toAddress)
            //    {
            //        Subject = "Feedback for Kark",
            //        Body = $"FROM:\n {feedbackModel.SubmitterEmail}\nTEXT:\n {feedbackModel.Text}"
            //    })
            //    {
            //        smtp.Send(message);
            //    }
            //});

            return Json(new { });
        }
    }
}