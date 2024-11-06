using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Proxies;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using WebTranslator.DAL.Entity;

namespace WebTranslator.DAL;

public class WebTranslatorContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public WebTranslatorContext(DbContextOptions<WebTranslatorContext> options)
        : base(options)
    {
        Database.EnsureCreated();

    }
    // public WebTranslatorContext(DbContextOptions<WebTranslatorContext> options) : base(options)
    // {
    //     if (Database.EnsureCreated())
    //     {
    //         User user = new User
    //         {
    //             Id = Guid.NewGuid(),
    //             FirstName = "Иван",
    //             LastName = "Иванович",
    //             Password = "123456",
    //             Salt = "123456",
    //
    //
    //         };
    //         Users.Add(user);
    //         SaveChanges();
    //     }
    // }
   
    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // { 
    //     if (!optionsBuilder.IsConfigured) // Check if it's already configured
    //     {
    //         
    //         var serverVersion = new MySqlServerVersion(new Version(8, 0, 26));
    //         optionsBuilder.UseLazyLoadingProxies()
    //             .UseMySql("server=localhost;user=root;password=adminroot;database=WebTranslator", serverVersion);
    //     }
    //     else
    //     {
    //         Console.WriteLine("Web Translator isn't configured");
    //     }
    // }

    
    
}