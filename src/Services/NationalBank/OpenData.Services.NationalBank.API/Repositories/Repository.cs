using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace OpenData.Services.NationalBank.API.Repositories;

public abstract class Repository<TEntity> : IRepository<TEntity>
    where TEntity : class
{
    private readonly DbContext _dbContext;

    protected Repository(DbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public TEntity Create(TEntity entity) => GetEntitySet().Add(entity).Entity;

    public IQueryable<TEntity> FindAll() => GetEntitySet().AsNoTracking();

    public IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> condition) =>
        GetEntitySet().Where(condition).AsNoTracking();

    public TEntity Update(TEntity entity) => GetEntitySet().Update(entity).Entity;

    public TEntity Delete(TEntity entity) => GetEntitySet().Remove(entity).Entity;

    private DbSet<TEntity> GetEntitySet() => _dbContext.Set<TEntity>();
}