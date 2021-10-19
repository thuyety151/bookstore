using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateReviewsMedia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Reviews_ReviewId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Reviews_ReviewId1",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ReviewId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ReviewId1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ReviewId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ReviewId1",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReviewId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewId1",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ReviewId",
                table: "AspNetUsers",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ReviewId1",
                table: "AspNetUsers",
                column: "ReviewId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Reviews_ReviewId",
                table: "AspNetUsers",
                column: "ReviewId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Reviews_ReviewId1",
                table: "AspNetUsers",
                column: "ReviewId1",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
