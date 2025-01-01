using Microsoft.EntityFrameworkCore;
using WebTranslator.BLL.Infrastructure;
using WebTranslator.BLL.Interfaces;
using WebTranslator.BLL.Service;
using WebTranslator.DAL;
using WebTranslator.DAL.Interfaces;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string? connStr = builder.Configuration.GetConnectionString("DefaultConnStr");

builder.Services.AddDbContext<WebTranslatorContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnStr"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnStr"))));



builder.Services.AddUnitOfWorkService();
builder.Services.AddTransient<DbContext, WebTranslatorContext>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession();

// Build the app
var app = builder.Build();
app.UseSession();

////////////////////////////////////////////////////////////////
/*if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/


app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.MapControllers();

app.UseCors(builder => builder.WithOrigins("http://localhost:5155")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                            .AllowCredentials());


app.Run();

