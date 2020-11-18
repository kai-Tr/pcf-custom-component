using System.Collections.Generic;
using Twilio.Jwt;
using Twilio.Jwt.Client;

namespace TwilioToken.Domain
{
    public class Capability
    {
        private readonly Credentials _credentials;

        public Capability(Credentials credentials)
        {
            _credentials = credentials;
        }

        public string Generate(string role)
        {
            var scopes = new HashSet<IScope>
            {
                new IncomingClientScope(role),
                new OutgoingClientScope(_credentials.TwiMLApplicationSID)
            };
            var capability = new ClientCapability(_credentials.AccountSID,
                                                  _credentials.AuthToken,
                                                  scopes: scopes);

            return capability.ToJwt();
        }
    }
}
