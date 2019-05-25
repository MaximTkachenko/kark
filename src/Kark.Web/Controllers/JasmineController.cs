using System.Web.Mvc;

namespace Kark.Web.Controllers
{
    public class JasmineController : Controller
    {
        [HttpGet, Route("jasmine_tests")]
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
