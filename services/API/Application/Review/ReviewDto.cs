using System;
using System.Collections.Generic;
using Domain;

namespace Application.Review
{
    public class ReviewDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public double Rate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        
        public ICollection<Media> Media { get; set; }
    }
}