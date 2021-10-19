using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddManyBookCoupons : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Coupons_CouponId1",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CouponId1",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CouponId1",
                table: "Books");

            migrationBuilder.AddColumn<Guid>(
                name: "BookId",
                table: "Coupons",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "BookCoupons",
                columns: table => new
                {
                    BookId = table.Column<Guid>(nullable: false),
                    CouponId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookCoupons", x => new { x.BookId, x.CouponId });
                    table.ForeignKey(
                        name: "FK_BookCoupons_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookCoupons_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Coupons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookCoupons_CouponId",
                table: "BookCoupons",
                column: "CouponId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookCoupons");

            migrationBuilder.DropColumn(
                name: "BookId",
                table: "Coupons");

            migrationBuilder.AddColumn<Guid>(
                name: "CouponId1",
                table: "Books",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_CouponId1",
                table: "Books",
                column: "CouponId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Coupons_CouponId1",
                table: "Books",
                column: "CouponId1",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
