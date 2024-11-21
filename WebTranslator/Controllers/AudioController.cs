using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using NAudio.Wave;
using WebTranslator.Lib;
namespace WebTranslator.Controllers;


[ApiController]
[Route("api/audio/")]
public class AudioController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly string _audioFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
    public string lastFile = string.Empty;

    public AudioController()
    {
        
        if (!Directory.Exists(_audioFolder))
        {
            Directory.CreateDirectory(_audioFolder);
        }
    }

    // POST: api/audio/upload
    [HttpPost("upload")]
    public async Task<IActionResult> UploadAudio([FromForm]TranslateModel model)
    {
        var audio = Request.Form.Files["audio"];
        if (audio == null || audio.Length == 0)
        {
            return new JsonResult(new { message = "No file selected for upload." }) { StatusCode = 400 };
            
        }

        if (model.to == "" || model.to == "")
        {
            return new JsonResult(new { message = "Select language" }) { StatusCode = 400 };
        }
        var filePath = Path.Combine(_audioFolder, $"{Guid.NewGuid()}{Path.GetExtension(audio.FileName)}");
        
        
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await audio.CopyToAsync(stream);
        }

        var speechService = new Speech();
        TranslateModel result = await speechService.SpeechToText(model.from, model.to, filePath);
        
   

        return Ok(new { message = "Аудио успешно загружено", result });
    }

    
    
    
}