using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using TwilioToken.Domain;

[assembly: FunctionsStartup(typeof(TwilioToken.Startup))]
namespace TwilioToken
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            //builder.Services.Configure<Credentials>("Credentials", (s) =>
            //{
            //    s.AccountSID = Environment.GetEnvironmentVariable("TwilioAccountSid");
            //    s.AuthToken = Environment.GetEnvironmentVariable("TwilioAuthToken");
            //    s.TwiMLApplicationSID = Environment.GetEnvironmentVariable("TwiMLApplicationSid");
            //});

            builder.Services.AddOptions<Credentials>()
                .Configure<IConfiguration>((settings, configuration) =>
                {
                    configuration.GetSection("TwilioSettings").Bind(settings);
                });
        }
    }
}
