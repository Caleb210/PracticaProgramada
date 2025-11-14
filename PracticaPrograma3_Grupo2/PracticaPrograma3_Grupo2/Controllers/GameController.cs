using Microsoft.AspNetCore.Mvc;

namespace PracticaPrograma3_Grupo2.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
