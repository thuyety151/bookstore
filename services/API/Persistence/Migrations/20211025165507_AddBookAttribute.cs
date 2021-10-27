using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddBookAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Attributes_AttributeId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_AttributeId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "AttributeId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "TotalStock",
                table: "Books");

            migrationBuilder.CreateTable(
                name: "BookAttribute",
                columns: table => new
                {
                    BookId = table.Column<Guid>(nullable: false),
                    AttributeId = table.Column<Guid>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    TotalStock = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookAttribute", x => new { x.BookId, x.AttributeId });
                    table.ForeignKey(
                        name: "FK_BookAttribute_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookAttribute_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookAttribute_AttributeId",
                table: "BookAttribute",
                column: "AttributeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookAttribute");

            migrationBuilder.AddColumn<Guid>(
                name: "AttributeId",
                table: "Books",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalStock",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Books_AttributeId",
                table: "Books",
                column: "AttributeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Attributes_AttributeId",
                table: "Books",
                column: "AttributeId",
                principalTable: "Attributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
