using Microsoft.EntityFrameworkCore;
using WebTranslator.DAL.Entity;
using WebTranslator.DAL.Interfaces;

namespace WebTranslator.DAL.Repository;

public class UserRepository : IUserRepository
{
    private WebTranslatorContext db;

    public UserRepository(WebTranslatorContext context)
    {
        this.db = context;
    }
    public async Task<IEnumerable<User>> GetUsers()
    {
        return await db.Users.ToListAsync();
    }
    
}