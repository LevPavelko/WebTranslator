using WebTranslator.DAL.Entity;

namespace WebTranslator.DAL.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetUsers();
}