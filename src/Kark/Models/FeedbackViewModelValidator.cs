using FluentValidation;

namespace Kark.Models
{
    public class FeedbackViewModelValidator : AbstractValidator<FeedbackViewModel>
    {
        public FeedbackViewModelValidator()
        {
            RuleFor(x => x.SubmitterEmail)
                .NotNull().NotEmpty().EmailAddress();

            RuleFor(x => x.SubmitterEmail)
                .NotNull().NotEmpty().MaximumLength(3000);
        }
    }
}
