using WebTranslator.DAL.Entity;

namespace WebTranslator.DAL.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetUsers();
    
    Task<User> GetUserByLogin(string login);
    
    Task Create(User user);
}