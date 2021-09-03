using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BookCategory>(x => x.HasKey(bc => new {bc.BookId, bc.CategoryId}));

            builder.Entity<BookCategory>()
                .HasOne(x => x.Book)
                .WithMany(x => x.Categories)
                .HasForeignKey(x => x.BookId);

            builder.Entity<BookCategory>()
                .HasOne(x => x.Category)
                .WithMany(x => x.Books)
                .HasForeignKey(x => x.CategoryId);
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Attribute> Attributes { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<WishList> WishLists { get; set; }
    }
}