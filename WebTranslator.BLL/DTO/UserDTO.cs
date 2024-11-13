namespace WebTranslator.BLL.DTO;

public class UserDTO
{
    public Guid Id { get; set; }
    
    public  string Login { get; set; }
    
    public  string Password { get; set; }
    
    public  string Salt { get; set; }
    
}