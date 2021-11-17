using System;
using Application.Core;
using Domain;
using MediatR;

namespace Application.Books
{
    public class Upsert
    {
        public class Command : IRequest<Result<Guid>>
        {
            public Book Book { get; set; }
        }
    }
}