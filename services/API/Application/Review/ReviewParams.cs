using System;
using Application.Core;

namespace Application.Review
{
    public class ReviewParams : PagingParams
    {
        public Guid BookId { get; set; }
    }
}