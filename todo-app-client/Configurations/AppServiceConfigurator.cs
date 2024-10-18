
namespace todo_app_client.Configuration;

public static class AppServiceConfigurator
{
    public static void AddAppServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddAutoMapper(typeof(Program));
    }
}