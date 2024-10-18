// using System;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Logging;

// namespace todo_app_client.Configuration;
// public static class DataContextConfigurator
// {
//     public static void AddDataContext(this WebApplicationBuilder builder, AppSettings appSettings)
//     {
//         builder.Services.AddDbContext<DataContext>(x => 
//         {
//             var connectionString = appSettings.ConnectionString;
//             x.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
//             x.LogTo(Console.WriteLine, LogLevel.Error);
//         });
//     }
// }