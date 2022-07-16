using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Books;
using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        
        public PagedList(IEnumerable<T> items, int count, int pageIndex, int pageSize)
        {
            AddRange(items);
            TotalCount = count;
            CurrentPage = pageIndex;
            PageSize = pageSize;
            TotalPage = (int) Math.Ceiling(count / (double) pageSize);
        }

        public static async Task<PagedList<T>> CreatePage(IQueryable<T> source, int pageIndex, int pageSize)
        {
            int count = await source.CountAsync();
            var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            return new PagedList<T>(items, count, pageIndex, pageSize);
        }
        
        public static async Task<PagedList<T>> CreatePageEnumerable(IList<T> source, int pageIndex, int pageSize)
        {
            int count = source.Count();
            var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            return new PagedList<T>(items, count, pageIndex, pageSize);
        }
    }
}