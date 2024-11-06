using WebTranslator.BLL.DTO;

namespace WebTranslator.BLL.Interfaces;

public interface IUserService
{
    public Task<IEnumerable<UserDTO>> GetUsers();
}