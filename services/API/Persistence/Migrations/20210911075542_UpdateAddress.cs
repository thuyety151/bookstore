using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "StreetAddress",
                table: "Addresses");

            migrationBuilder.AddColumn<string>(
                name: "ApartmentNumber",
                table: "Addresses",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "Addresses",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Addresses",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "Addresses",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wards",
                table: "Addresses",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApartmentNumber",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "District",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "Wards",
                table: "Addresses");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StreetAddress",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
