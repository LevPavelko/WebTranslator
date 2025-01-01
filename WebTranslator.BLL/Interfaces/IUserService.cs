using WebTranslator.BLL.DTO;

namespace WebTranslator.BLL.Interfaces;

public interface IUserService
{
    public Task<IEnumerable<UserDTO>> GetUsers();
    
    public Task<UserDTO> GetUserByLogin(string login);
    
    public Task Create(UserDTO user);
}