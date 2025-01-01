using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebTranslator.Domain;

public interface IDbEntity
{
    [Key]
    [Column("id")]
    Guid Id { get; set; }
}