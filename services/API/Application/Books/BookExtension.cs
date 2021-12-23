using System;
using System.Linq;
using System.Linq.Expressions;

namespace Application.Books
{
    public static class BookExtension
    {
        public static IQueryable<TSource> DistinctBy<TSource, TKey>  (this IQueryable<TSource> source, Expression<Func<TSource, TKey>> keySelector)
        {
            return source.GroupBy(keySelector).Select(x => x.FirstOrDefault());
        }
    }
}