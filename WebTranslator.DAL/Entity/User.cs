using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebTranslator.Domain;

namespace WebTranslator.DAL.Entity;

public class User : IDbEntity
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }
        
    [Column("first_name")]
    public required string FirstName { get; set; }
    
    [Column("last_name")]
    public required string LastName { get; set; }
    
    [Column("password")]
    public required string Password { get; set; }
    
    [Column("salt")]
    public required string Salt { get; set; }
}