using todo_app_client.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var appSettings = builder.SetupAppSettings();
var corsPolicyName = builder.SetupCors();

builder.SetupDataContext(appSettings);
builder.AddAuth(appSettings);
builder.AddAppServices();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseCors(corsPolicyName);

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
