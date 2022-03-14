using System.Linq.Expressions;

namespace OpenData.Services.NationalBank.API.Repositories;

public interface IRepository<TEntity>
{
    TEntity Create(TEntity entity);

    IQueryable<TEntity> FindAll();

    IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> condition);

    TEntity Update(TEntity entity);

    TEntity Delete(TEntity entity);
}