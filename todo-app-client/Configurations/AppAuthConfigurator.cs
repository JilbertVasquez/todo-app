using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace todo_app_client.Configuration;

public static class AppAuthConfigurator
{
    public static void AddAuth(this WebApplicationBuilder builder, AppSettings appSettings)
    {
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => 
            {
                options.TokenValidationParameters = new()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings.TokenSigningKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
    }
}