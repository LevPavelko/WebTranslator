namespace WebTranslator.DAL.Interfaces;

public interface IUnitOfWork
{
    IUserRepository Users { get; }
    Task Save();
}