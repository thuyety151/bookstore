using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Review
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public double Rate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public ICollection<AppUser> Likes { get; set; }
        public ICollection<AppUser> DisLikes { get; set; }
        public ICollection<Media> Media { get; set; }
        public Book Book { get; set; }
        public AppUser User { get; set; }

        [NotMapped]
        public int TotalLikes { get; set; }
        [NotMapped]
        public int TotalDisLikes { get; set; }
        
        
    }
}