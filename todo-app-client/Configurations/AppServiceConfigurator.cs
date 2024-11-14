
using todo_app_client.Helpers;

namespace todo_app_client.Configuration;

public static class AppServiceConfigurator
{
    public static void AddAppServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IAuthGuard, AuthGuard>();
        builder.Services.AddAutoMapper(typeof(Program));
    }
}