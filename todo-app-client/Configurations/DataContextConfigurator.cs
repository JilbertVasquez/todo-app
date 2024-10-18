using Microsoft.EntityFrameworkCore;
using todo_app_client.Api.Data;

namespace todo_app_client.Configuration
{
    public static class DataContextConfigurator
    {
        public static void SetupDataContext(this WebApplicationBuilder builder, AppSettings appSettings)
        {
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseMySql(appSettings.ConnectionString ?? "", ServerVersion.Parse("8.0.24"));
            });
        }
    }
}
