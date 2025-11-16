using Microsoft.AspNetCore.Mvc;

namespace PracticaPrograma3_Grupo2.Controllers
{
    public class GameController : Controller
    {


        // Es es la pantalla principal para ver el juego
        public IActionResult Index()
        {
            return View();
        }



        // Esta es la pantalla para el juego
        public IActionResult Play()
        {
            return View();
        }



        // Y esta es la pantalla final
        public IActionResult End(int score)
        {
            ViewBag.Score = score;
            return View();
        }
    }
}
