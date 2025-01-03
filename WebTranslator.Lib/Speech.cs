    using System.Diagnostics;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using NAudio.Wave;
using Newtonsoft.Json;

namespace WebTranslator.Lib;

public class Speech
{
    private static readonly string key = "4bbf471c25714f1a88d6185d7df0dc52";
    private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com/";
    private static readonly string location = "eastus";
    
   
    private static bool IsWavFile(string filePath)
    {
        try
        {
            using (var reader = new BinaryReader(new FileStream(filePath, FileMode.Open)))
            {
                var riff = new string(reader.ReadChars(4));
                var chunkSize = reader.ReadInt32();
                var wave = new string(reader.ReadChars(4));

                return riff == "RIFF" && wave == "WAVE";
            }
        }
        catch
        {
            return false;
        }
    }

    public async Task<TranslateModel> SpeechToText(string from, string to, string pathFile)
    {
        var convertedFilePath = Path.Combine("Uploads/", "recording_converted.wav");
        try
        {
            string fromLanguage  = RemoveAfterDash(from);
            string toLanguage = RemoveAfterDash(to);
            var path = RemoveFullPath(pathFile);


            ConvertToPcm16Le(path, convertedFilePath);
           
            if (!IsWavFile(convertedFilePath))
            {
                throw new FormatException("Provided file is not a valid WAV file.");
            }
          
            var speechConfig = SpeechConfig.FromSubscription("f1835bf847064e36a7c3f95f81f53355", "eastus");
            speechConfig.SpeechRecognitionLanguage = from;
           

            using var audioConfig = AudioConfig.FromWavFileInput(convertedFilePath);
            using var speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
           
            while (!Console.KeyAvailable || Console.ReadKey().Key != ConsoleKey.Enter)
            {
                var speechRecognitionResult = await speechRecognizer.RecognizeOnceAsync();
                Console.WriteLine($"RECOGNIZED: Text={speechRecognitionResult.Text}");

                string textToTranslate = speechRecognitionResult.Text;
                var answer = await Translate(textToTranslate, fromLanguage,toLanguage);
                var json = JsonConvert.DeserializeObject<Translations[]>(answer);
                TranslateModel model = new TranslateModel();
                model.from = textToTranslate;
                model.to = json[0].translations[0].text;
                return model;
              
            }


        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }
        finally
        {
            
            try
            {
                if (pathFile != null && System.IO.File.Exists(pathFile))
                {
                    System.IO.File.Delete(pathFile);
                    Console.WriteLine($"Deleted file: {pathFile}");
                }

                if (convertedFilePath != null && System.IO.File.Exists(convertedFilePath))
                {
                    System.IO.File.Delete(convertedFilePath);
                    Console.WriteLine($"Deleted file: {convertedFilePath}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting files: {ex.Message}");
            }
        }

        return new TranslateModel();
    }

    public async Task<string> TextToSpeech(string text)
    {
        var speechConfig = SpeechConfig.FromSubscription("f1835bf847064e36a7c3f95f81f53355", "eastus");
        speechConfig.SpeechSynthesisVoiceName = "en-US-AvaMultilingualNeural"; 

        try
        {
            var filePath = Path.Combine("wwwroot/Uploads/", "translated_audio.wav"); // was :  var filePath = Path.Combine("Uploads/", "translated_audio.wav");
            var audioConfig = AudioConfig.FromWavFileOutput(filePath);
            using var synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
            var result = await synthesizer.SpeakTextAsync(text);
            return filePath;
           
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error occurred: {ex.Message}");
            
        }
        return "Something went wrong";
    }
    
    static string RemoveAfterDash(string text)
    {
        return Regex.Replace(text, @"-.*", "");
    }
    static string RemoveFullPath(string path)
    {
        return Regex.Replace(path, @".*(?=Uploads)", "");

    }
    private static async Task<string> Translate(string textToTranslate,string fromLanguage, string toLanguage)
    {
        string route = "/translate?api-version=3.0&from=" + fromLanguage + "&to=" + toLanguage;
        object[] body = new object[] { new { Text = textToTranslate } };
        var requestBody = JsonConvert.SerializeObject(body);

        using (var client = new HttpClient())
        using (var request = new HttpRequestMessage())
        {
            request.Method = HttpMethod.Post;
            request.RequestUri = new Uri(endpoint + route);
            request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            request.Headers.Add("Ocp-Apim-Subscription-Key", key);
            request.Headers.Add("Ocp-Apim-Subscription-Region", location);
            
            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
               
            string result = await response.Content.ReadAsStringAsync();
            return result;
        }
           
    }

    private void ConvertToPcm16Le(string inputFilePath, string outputFilePath)
    {
            using (var reader = new AudioFileReader(inputFilePath))
            {
                var format = new WaveFormat(16000, 16, 1);
                using (var resampler = new MediaFoundationResampler(reader, format))
                {
                    WaveFileWriter.CreateWaveFile(outputFilePath, resampler);
                }
            }
       
    }

    //private void ConvertRawToPcm16Le(string inputFilePath, string outputFilePath)
    //{
    //    // Формат входного файла (например, RAW, 44.1 кГц, 16 бит, стерео)
    //    var inputFormat = new WaveFormat(44100, 16, 2);

    //    // Читаем "сырые" данные
    //    using (var rawStream = new RawSourceWaveStream(File.OpenRead(inputFilePath), inputFormat))
    //    {
    //        // Конвертируем в формат 16 кГц, 16 бит, моно
    //        var outputFormat = new WaveFormat(16000, 16, 1);
    //        using (var resampler = new MediaFoundationResampler(rawStream, outputFormat))
    //        {
    //            resampler.ResamplerQuality = 60; // Устанавливаем качество ресемплинга
    //            WaveFileWriter.CreateWaveFile(outputFilePath, resampler);
    //        }
    //    }
    //}

}