using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TwilioServer.Api.Domain;

namespace TwilioServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly Credentials _credentials;
        public TokenController(IOptions<Credentials> credentials)
        {
            _credentials = credentials.Value;
        }

        [HttpPost("generate")]
        public string Generate([FromBody]string scope)
        {
            return new Capability(_credentials).Generate(scope);
        }
    }
}
