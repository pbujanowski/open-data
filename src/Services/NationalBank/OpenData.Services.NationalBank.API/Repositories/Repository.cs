using Microsoft.EntityFrameworkCore;

namespace OpenData.Services.NationalBank.API.Repositories;

public abstract class Repository<TEntity> : IRepository<TEntity>
    where TEntity : class
{
    private readonly DbContext _dbContext;

    protected Repository(DbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public TEntity Create(TEntity entity)
    {
        return _dbContext.Set<TEntity>().Add(entity).Entity;
    }

    public IQueryable<TEntity> FindAll()
    {
        return _dbContext.Set<TEntity>().AsNoTracking();
    }

    public TEntity Update(TEntity entity)
    {
        return _dbContext.Set<TEntity>().Update(entity).Entity;
    }

    public TEntity Delete(TEntity entity)
    {
        return _dbContext.Set<TEntity>().Remove(entity).Entity;
    }
}