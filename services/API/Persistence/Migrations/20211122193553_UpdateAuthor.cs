using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateAuthor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MediaId",
                table: "Authors",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Authors_MediaId",
                table: "Authors",
                column: "MediaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Authors_Media_MediaId",
                table: "Authors",
                column: "MediaId",
                principalTable: "Media",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Authors_Media_MediaId",
                table: "Authors");

            migrationBuilder.DropIndex(
                name: "IX_Authors_MediaId",
                table: "Authors");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Authors");
        }
    }
}
