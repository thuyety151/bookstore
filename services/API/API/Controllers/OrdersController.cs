﻿using System;
using System.Threading.Tasks;
using Application.Core;
using Application.Orders;
using Application.Orders.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderParams = Application.Orders.OrderParams;
using Upsert = Application.Orders.Upsert;
namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateOrder(OrderParams orderParams)
        {
            return HandleResult(await Mediator.Send(new Upsert.Command() { OrderParams = orderParams }));
        }

        [HttpPost]
        [Route("update-order-code")]
        public async Task<IActionResult> UpdateOrderCode(UpdateOrderCode.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost]
        [Route("update-order-status")]
        public async Task<IActionResult> UpdateOrderStatus(UpdateOrderStatus.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost]
        [Route("cancel")]
        public async Task<IActionResult> UpdateOrderCode(Cancel.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> ListOrder([FromQuery] PagingParams pagingParams, string status, string keywords)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query() { Params = pagingParams, Status = status, Keywords = keywords }));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command() { Id = id }));
        }
        [HttpGet]
        public async Task<IActionResult> Detail(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detail.Query() { Id = id }));
        }
        [HttpDelete]
        [Route("delete-order-fail")]
        public async Task<IActionResult> DeleteOrderFail(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteOrderFail.Command() { Id = id }));
        }
        [HttpPost]
        [Route("update-order-note")]
        public async Task<IActionResult> UpdateOrderNote(UpdateOrderNote.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}