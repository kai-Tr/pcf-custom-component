using Twilio.TwiML;
using Microsoft.AspNetCore.Mvc;
using Twilio.AspNet.Core;
using Twilio.AspNet.Common;

namespace TwilioServer.Controllers
{
    public class SmsController : TwilioController
    {
        //[HttpPost]
        //public TwiMLResult Index()
        //{
        //    var messagingResponse = new MessagingResponse();
        //    messagingResponse.Message("The Robots are coming! Head for the hills!");

        //    return TwiML(messagingResponse);
        //}
        [HttpPost]
        public TwiMLResult Index(SmsRequest request)
        {
            var response = new MessagingResponse();
            response.Message("Hello World");
            return TwiML(response);
        }
    }
}
