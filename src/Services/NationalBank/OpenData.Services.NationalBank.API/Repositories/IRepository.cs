namespace OpenData.Services.NationalBank.API.Repositories;

public interface IRepository<TEntity>
{
    TEntity Create(TEntity entity);

    IQueryable<TEntity> FindAll();

    TEntity Update(TEntity entity);

    TEntity Delete(TEntity entity);
}