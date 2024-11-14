

namespace todo_app_client.Configuration;

public static class AppSettingsConfigurator
{
    public static AppSettings SetupAppSettings(this WebApplicationBuilder builder)
    {
        var appSettings = new AppSettings();
        builder.Configuration.GetSection(nameof(AppSettings)).Bind(appSettings);
        builder.Services.Configure<AppSettings>(builder.Configuration.GetSection(nameof(AppSettings)));
        return appSettings;
    }
}