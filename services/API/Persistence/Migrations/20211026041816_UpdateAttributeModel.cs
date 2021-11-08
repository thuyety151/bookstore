using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UpdateAttributeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AttributeId",
                table: "Items",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "AttributeName",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DefaultAttributeId",
                table: "ConfigQuantities",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttributeId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "AttributeName",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "DefaultAttributeId",
                table: "ConfigQuantities");
        }
    }
}
