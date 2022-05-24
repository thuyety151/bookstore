using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ModifyCouponModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MediaId",
                table: "Coupons",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserCoupons",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    CouponId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCoupons", x => new { x.UserId, x.CouponId });
                    table.ForeignKey(
                        name: "FK_UserCoupons_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Coupons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCoupons_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_MediaId",
                table: "Coupons",
                column: "MediaId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCoupons_CouponId",
                table: "UserCoupons",
                column: "CouponId");

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Media_MediaId",
                table: "Coupons",
                column: "MediaId",
                principalTable: "Media",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Media_MediaId",
                table: "Coupons");

            migrationBuilder.DropTable(
                name: "UserCoupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_MediaId",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "MediaId",
                table: "Coupons");
        }
    }
}
