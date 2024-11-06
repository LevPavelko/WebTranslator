using AutoMapper;
using WebTranslator.BLL.DTO;
using WebTranslator.BLL.Interfaces;
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
    
}