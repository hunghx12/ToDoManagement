using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TodoApi.Services
{
    public class AuthService
    {
        private readonly string _key;
        private readonly string _issuer;
        private readonly string _audience;

        // Pre-defined username and password
        private readonly string _validUsername = "testuser";
        private readonly string _validPassword = "password123";

        public AuthService(IConfiguration config)
        {
            _key = config["Jwt:Key"];
            _issuer = config["Jwt:Issuer"];
            _audience = config["Jwt:Audience"];
        }

        public bool ValidateUser(string username, string password)
        {
            // Validate the username and password against pre-defined values
            return username == _validUsername && password == _validPassword;
        }

        public string GenerateJwtToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, _validUsername)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
