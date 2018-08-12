using System;
using System.Linq;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Kark.Filters
{
    public class ValidatorFilter : IActionFilter
    {
        private readonly IServiceProvider _serviceProvider;

        public ValidatorFilter(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ActionArguments.Count == 0)
            {
                return;
            }

            foreach (var arg in context.ActionArguments)
            {
                if (arg.Value == null)
                {
                    continue;
                }

                var validator = _serviceProvider.GetService(typeof(IValidator<>).MakeGenericType(arg.Value.GetType()));

                if (validator == null)
                {
                    continue;
                }

                var result = ((IValidator)validator).Validate(arg.Value);
                if (result.IsValid)
                {
                    return;
                }

                var error = result.Errors.First();
                context.HttpContext.Response.ContentType = "application/json";
                context.Result = new BadRequestObjectResult(new { Error = error.ErrorMessage });
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        { }
    }
}
