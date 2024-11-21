namespace WebTranslator;

public class TranslateModel
{
    public string from { get; set; }
    public string to { get; set; }
    public byte[]? translatedAudio { get; set; }
    
}