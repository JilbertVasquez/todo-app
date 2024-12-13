using Microsoft.Extensions.FileProviders;
using todo_app_client.Configuration;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var appSettings = builder.SetupAppSettings();
var corsPolicyName = builder.SetupCors();

builder.SetupDataContext(appSettings);
builder.AddAuth(appSettings);
builder.AddAppServices();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseCors(corsPolicyName);

app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.WebRootPath, "browser"))
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.WebRootPath, "browser"))
});
app.MapCustomFallbackToFile();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
