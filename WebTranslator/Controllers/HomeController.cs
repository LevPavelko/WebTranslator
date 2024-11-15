using Microsoft.AspNetCore.Mvc;

namespace WebTranslator.Controllers;


[ApiController]
[Route("api/home/")]
public class HomeController : ControllerBase
{
    [HttpGet("checkCookie")]
    public IActionResult CheckCookie()
    {
       
        if (Request.Cookies["isLogin"] == null)
        {
            return new JsonResult(new { message = "There is no cookie" }) { StatusCode = 401 };
        }
        

        return Ok(new { message = "Cookie is valid." });
    }
    
}