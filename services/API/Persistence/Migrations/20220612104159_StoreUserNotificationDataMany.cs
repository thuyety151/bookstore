using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class StoreUserNotificationDataMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserNotis_Notifications_NotificationId",
                table: "UserNotis");

            migrationBuilder.DropForeignKey(
                name: "FK_UserNotis_AspNetUsers_UserId1",
                table: "UserNotis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserNotis",
                table: "UserNotis");

            migrationBuilder.DropIndex(
                name: "IX_UserNotis_UserId1",
                table: "UserNotis");

            migrationBuilder.DropColumn(
                name: "NotiId",
                table: "UserNotis");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "UserNotis");

            migrationBuilder.AlterColumn<Guid>(
                name: "NotificationId",
                table: "UserNotis",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserNotis",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserNotis",
                table: "UserNotis",
                columns: new[] { "UserId", "NotificationId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotis_Notifications_NotificationId",
                table: "UserNotis",
                column: "NotificationId",
                principalTable: "Notifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotis_AspNetUsers_UserId",
                table: "UserNotis",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserNotis_Notifications_NotificationId",
                table: "UserNotis");

            migrationBuilder.DropForeignKey(
                name: "FK_UserNotis_AspNetUsers_UserId",
                table: "UserNotis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserNotis",
                table: "UserNotis");

            migrationBuilder.AlterColumn<Guid>(
                name: "NotificationId",
                table: "UserNotis",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserNotis",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<Guid>(
                name: "NotiId",
                table: "UserNotis",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "UserNotis",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserNotis",
                table: "UserNotis",
                columns: new[] { "UserId", "NotiId" });

            migrationBuilder.CreateIndex(
                name: "IX_UserNotis_UserId1",
                table: "UserNotis",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotis_Notifications_NotificationId",
                table: "UserNotis",
                column: "NotificationId",
                principalTable: "Notifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotis_AspNetUsers_UserId1",
                table: "UserNotis",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
