using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class Author
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Media Media { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}