using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using todo_app_client.Configuration;

namespace todo_app_client.Helpers;

public interface IAuthGuard
{
    string EncodeToken(IEnumerable<Claim> claims);
    void EnsureRole();
}

public class AuthGuard : IAuthGuard
{
    private readonly IOptions<AppSettings> _appSettings;
    private readonly HttpContext _http;

    public AuthGuard(
        IOptions<AppSettings> appSettings,
        IHttpContextAccessor httpContextAccessor)
    {
        _appSettings = appSettings;
        _http = httpContextAccessor.HttpContext!;
    }
    public string EncodeToken(IEnumerable<Claim> claims)
    {
        Console.WriteLine($"TokenSigningKey:", _appSettings.Value.TokenSigningKey);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Value.TokenSigningKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = credentials,
            Expires = DateTime.UtcNow.AddHours(8).AddDays(1)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public UserRolesName GetRole()
    {
        var role = _http.User.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(role)) throw new UnauthorizedAccessException("AG: Required role missing.");
        if (!Enum.TryParse(role, out UserRolesName r)) throw new Exception("Unable to parse role");
        return r;
    }

    public void EnsureRole()
    {
        var role = GetRole();
        if (role == UserRolesName.Admin || role == UserRolesName.SuperAdmin) return;
        if (role == UserRolesName.User) throw new UnauthorizedAccessException("AG: Unauthorized");
    }
}