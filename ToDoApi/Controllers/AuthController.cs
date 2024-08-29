using Microsoft.AspNetCore.Mvc;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (_authService.ValidateUser(loginRequest.Username, loginRequest.Password))
            {
                var token = _authService.GenerateJwtToken();
                return Ok(new { token });
            }
            else
            {
                return Unauthorized("Invalid username or password");
            }
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
