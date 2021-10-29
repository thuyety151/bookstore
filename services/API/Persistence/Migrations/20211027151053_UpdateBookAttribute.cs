using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateBookAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "SalePrice",
                table: "BookAttributes",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "SalePriceEndDate",
                table: "BookAttributes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "SalePriceStartDate",
                table: "BookAttributes",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "StockStatus",
                table: "BookAttributes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SalePrice",
                table: "BookAttributes");

            migrationBuilder.DropColumn(
                name: "SalePriceEndDate",
                table: "BookAttributes");

            migrationBuilder.DropColumn(
                name: "SalePriceStartDate",
                table: "BookAttributes");

            migrationBuilder.DropColumn(
                name: "StockStatus",
                table: "BookAttributes");
        }
    }
}
