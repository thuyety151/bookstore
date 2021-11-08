using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookAttribute_Attributes_AttributeId",
                table: "BookAttribute");

            migrationBuilder.DropForeignKey(
                name: "FK_BookAttribute_Books_BookId",
                table: "BookAttribute");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookAttribute",
                table: "BookAttribute");

            migrationBuilder.RenameTable(
                name: "BookAttribute",
                newName: "BookAttributes");

            migrationBuilder.RenameIndex(
                name: "IX_BookAttribute_AttributeId",
                table: "BookAttributes",
                newName: "IX_BookAttributes_AttributeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookAttributes",
                table: "BookAttributes",
                columns: new[] { "BookId", "AttributeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookAttributes_Attributes_AttributeId",
                table: "BookAttributes",
                column: "AttributeId",
                principalTable: "Attributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookAttributes_Books_BookId",
                table: "BookAttributes",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookAttributes_Attributes_AttributeId",
                table: "BookAttributes");

            migrationBuilder.DropForeignKey(
                name: "FK_BookAttributes_Books_BookId",
                table: "BookAttributes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookAttributes",
                table: "BookAttributes");

            migrationBuilder.RenameTable(
                name: "BookAttributes",
                newName: "BookAttribute");

            migrationBuilder.RenameIndex(
                name: "IX_BookAttributes_AttributeId",
                table: "BookAttribute",
                newName: "IX_BookAttribute_AttributeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookAttribute",
                table: "BookAttribute",
                columns: new[] { "BookId", "AttributeId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookAttribute_Attributes_AttributeId",
                table: "BookAttribute",
                column: "AttributeId",
                principalTable: "Attributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookAttribute_Books_BookId",
                table: "BookAttribute",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
