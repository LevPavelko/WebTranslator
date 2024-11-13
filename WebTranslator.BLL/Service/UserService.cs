using AutoMapper;
using WebTranslator.BLL.DTO;
using WebTranslator.BLL.Interfaces;
using WebTranslator.BLL.Infrastructure;
using WebTranslator.DAL.Entity;
using WebTranslator.DAL.Interfaces;

namespace WebTranslator.BLL.Service;

public class UserService : IUserService
{
    IUnitOfWork Database { get; set; }
    public UserService(IUnitOfWork uow)
    {
        Database = uow; 
          
    }

    public async Task<IEnumerable<UserDTO>> GetUsers()
    {
        var mapper = new MapperConfiguration(cfg => cfg.CreateMap<User, UserDTO>()).CreateMapper();
        return mapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(await Database.Users.GetUsers());
    }

    public async Task<UserDTO> GetUserByLogin(string login)
    {
        var user = await Database.Users.GetUserByLogin(login);
        if (user == null)
        {
            return null;
        }
            
        
        return new UserDTO
        {
            Id = user.Id,
            Login = user.Login,
            Password = user.Password,
            Salt = user.Salt,
        };
        
    }

    public async Task Create(UserDTO userDto)
    {
        User user = new User
        {
            Login = userDto.Login,
            Password = userDto.Password,
            Salt = userDto.Salt,

        };
        await Database.Users.Create(user);
        await Database.Save();
    }
    
}