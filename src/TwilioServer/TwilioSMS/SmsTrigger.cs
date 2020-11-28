using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Twilio.TwiML;
using Twilio.AspNet.Common;

namespace TwilioSMS
{
    public static class SmsTrigger
    {
        [FunctionName("sms")]
        public static async Task<IActionResult> SmsAsync([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req, ILogger log)
        {
            log.LogInformation("Twilio make a call.");
            var request = (await req.ReadFormAsync()).BindToModel<SmsRequest>();

            var response = new MessagingResponse();
            return new ContentResult { Content = response.ToString(), ContentType = "application/xml" };
        }
    }
}
