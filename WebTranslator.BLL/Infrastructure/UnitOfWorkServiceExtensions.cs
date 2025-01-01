using Microsoft.Extensions.DependencyInjection;
using WebTranslator.DAL.Interfaces;
using WebTranslator.DAL.Repository;

namespace WebTranslator.BLL.Infrastructure;

public static class UnitOfWorkServiceExtensions
{
    public static void AddUnitOfWorkService(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, EFUnitOfWork>();
    }
}