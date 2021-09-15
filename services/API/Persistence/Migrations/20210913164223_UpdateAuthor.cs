using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateAuthor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookCategory_Books_BookId",
                table: "BookCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_BookCategory_Categories_CategoryId",
                table: "BookCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_Books_Author_AuthorId",
                table: "Books");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookCategory",
                table: "BookCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Author",
                table: "Author");

            migrationBuilder.RenameTable(
                name: "BookCategory",
                newName: "BooksCategories");

            migrationBuilder.RenameTable(
                name: "Author",
                newName: "Authors");

            migrationBuilder.RenameIndex(
                name: "IX_BookCategory_CategoryId",
                table: "BooksCategories",
                newName: "IX_BooksCategories_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BooksCategories",
                table: "BooksCategories",
                columns: new[] { "BookId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Authors",
                table: "Authors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Authors_AuthorId",
                table: "Books",
                column: "AuthorId",
                principalTable: "Authors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BooksCategories_Books_BookId",
                table: "BooksCategories",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BooksCategories_Categories_CategoryId",
                table: "BooksCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Authors_AuthorId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_BooksCategories_Books_BookId",
                table: "BooksCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_BooksCategories_Categories_CategoryId",
                table: "BooksCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BooksCategories",
                table: "BooksCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Authors",
                table: "Authors");

            migrationBuilder.RenameTable(
                name: "BooksCategories",
                newName: "BookCategory");

            migrationBuilder.RenameTable(
                name: "Authors",
                newName: "Author");

            migrationBuilder.RenameIndex(
                name: "IX_BooksCategories_CategoryId",
                table: "BookCategory",
                newName: "IX_BookCategory_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookCategory",
                table: "BookCategory",
                columns: new[] { "BookId", "CategoryId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Author",
                table: "Author",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookCategory_Books_BookId",
                table: "BookCategory",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookCategory_Categories_CategoryId",
                table: "BookCategory",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Author_AuthorId",
                table: "Books",
                column: "AuthorId",
                principalTable: "Author",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
