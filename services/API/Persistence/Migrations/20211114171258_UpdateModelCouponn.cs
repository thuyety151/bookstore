using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateModelCouponn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Coupons_CouponId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_CouponId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "IsAllowFreeShipping",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "IsIndividualOnly",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "MaxSpend",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "CouponId",
                table: "Categories");

            migrationBuilder.AddColumn<double>(
                name: "CouponAmount",
                table: "Coupons",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CouponAmount",
                table: "Coupons");

            migrationBuilder.AddColumn<bool>(
                name: "IsAllowFreeShipping",
                table: "Coupons",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsIndividualOnly",
                table: "Coupons",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "MaxSpend",
                table: "Coupons",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "CouponId",
                table: "Categories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CouponId",
                table: "Categories",
                column: "CouponId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Coupons_CouponId",
                table: "Categories",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
