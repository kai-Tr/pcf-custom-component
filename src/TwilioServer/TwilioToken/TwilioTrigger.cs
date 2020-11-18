using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TwilioToken.Domain;
using Microsoft.Extensions.Options;
using Twilio.TwiML;
using Twilio.TwiML.Voice;
using Newtonsoft.Json;

namespace TwilioToken
{
    public class TwilioTrigger
    {
        private readonly Credentials _credentials;
        public TwilioTrigger(IOptions<Credentials> options)
        {
            _credentials = options.Value;
        }

        [FunctionName("token")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req, ILogger log)
        {
            log.LogInformation("HTTP trigger function processed a request.");
            var content = await new StreamReader(req.Body).ReadToEndAsync();
            return new OkObjectResult(new Capability(_credentials).Generate(content));
        }

        [FunctionName("connect")]
        public IActionResult Connect(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req, ILogger log)
        {
            log.LogInformation("Twilio make a call.");
            var phoneNumber = (string)req.Form["phoneNumber"];
            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                return new BadRequestResult();
            }

            var response = new VoiceResponse();

            var dial = new Dial(callerId: _credentials.PhoneNumber);
            dial.Number(phoneNumber);
            response.Append(dial);
            return new ContentResult { Content = response.ToString(), ContentType = "application/xml" };
        }
    }
}
