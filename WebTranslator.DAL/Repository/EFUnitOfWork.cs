using WebTranslator.DAL.Interfaces;

namespace WebTranslator.DAL.Repository;

public class EFUnitOfWork : IUnitOfWork
{
    private WebTranslatorContext db;
    private UserRepository userRepository;
    
    public EFUnitOfWork(WebTranslatorContext context)
    {
        db = context;
    }

    public IUserRepository Users
    {
        get
        {
            if (userRepository == null)
                userRepository = new UserRepository(db);
            return userRepository;
        }
    }
    public async Task Save()
    {
        await db.SaveChangesAsync();
    }
}