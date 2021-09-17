using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtension
    {
        public static void AddPaginationHeader(this HttpResponse response, int pageIndex, int pageSize, int totalPage,
            int totalCount)
        {
            var pagination = new
            {
                pageIndex,
                pageSize,
                totalPage,
                totalCount
            };
            
            response.Headers.Add("Pagination", JsonSerializer.Serialize(pagination));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}