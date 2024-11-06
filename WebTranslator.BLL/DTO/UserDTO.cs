namespace WebTranslator.BLL.DTO;

public class UserDTO
{
    
    public Guid Id { get; set; }
        
  
    public required string FirstName { get; set; }
    
   
    public required string LastName { get; set; }
    
   
    public required string Password { get; set; }
    
    public required string Salt { get; set; }
}