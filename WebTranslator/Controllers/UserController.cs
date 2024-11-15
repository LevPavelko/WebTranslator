using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WebTranslator.BLL.DTO;
using WebTranslator.BLL.Interfaces;

using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace WebTranslator.Controllers;

[ApiController]
[Route("api/user/")]
public class UserController : ControllerBase
{
    private readonly  IUserService _userService;
    
    public UserController(IUserService userService)
    {
       _userService = userService;
    }
    
    [HttpGet("Users")]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetMedia()
    { 
        IEnumerable<UserDTO> users = await _userService.GetUsers();
        return users.ToList();
    }
    
    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await _userService.GetUserByLogin(model.username);

       
        if (user != null && user.Password == Decryption(user.Salt, model.password))
        {
           
            var userToReturn = new
            {
                user.Id,
                user.Login
            };

            HttpContext.Session.SetString("userlogin", model.username);
            return new JsonResult(new { message = "Login successful", user = userToReturn });
        
        }

        return new JsonResult(new { message = "Invalid login or password." }) { StatusCode = 401 };
    }
    
    [HttpPost("Register")]
    public async Task<IActionResult> Register(LoginModel reg)
    {
        if (reg == null)
            return new JsonResult(new { message = "Values can't be empty" }) { StatusCode = 401 };

        var user = await _userService.GetUserByLogin(reg.username);
        if(user != null)
            return new JsonResult(new { message = "User with this username exists!" }) { StatusCode = 401 };
        
        UserDTO userDto = new UserDTO();
        userDto.Login = reg.username;
        byte[] saltbuf = new byte[16];

        RandomNumberGenerator randomNumberGenerator = RandomNumberGenerator.Create();
        randomNumberGenerator.GetBytes(saltbuf);

        StringBuilder sb = new StringBuilder(16);
        for (int i = 0; i < 16; i++)
            sb.Append(string.Format("{0:X2}", saltbuf[i]));
        string salt = sb.ToString();


        byte[] password = Encoding.Unicode.GetBytes(salt + reg.password);

        byte[] byteHash = SHA256.HashData(password);

        StringBuilder hash = new StringBuilder(byteHash.Length);
        for (int i = 0; i < byteHash.Length; i++)
            hash.Append(string.Format("{0:X2}", byteHash[i]));

        userDto.Password = hash.ToString();
        userDto.Salt = salt;
        await _userService.Create(userDto);

        HttpContext.Session.SetString("userlogin", reg.username);
        return Ok(new { message = "User registered successfully" });
       
           

    }
    
    [HttpPost("decryption")]
    public string Decryption(string salt,  string enteredPassword) {
           
        byte[] password = Encoding.Unicode.GetBytes(salt + enteredPassword);

        byte[] byteHash = SHA256.HashData(password);

        StringBuilder hash = new StringBuilder(byteHash.Length);
        for (int i = 0; i < byteHash.Length; i++)
            hash.Append(string.Format("{0:X2}", byteHash[i]));
        return hash.ToString();

    }
        
        
}

