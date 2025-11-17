$(document).ready(function () {

    

    const $btnHighContrast = $("#btnHighContrast");
    const $btnFontUp = $("#btnFontUp");

    if ($btnHighContrast.length) {
        $btnHighContrast.on("click keydown", function (e) {
            if (e.type === "click" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();

                const isPressed = $(this).attr("aria-pressed") === "true";
                const newState = !isPressed;

                $(this).attr("aria-pressed", newState);
                $("body").toggleClass("high-contrast", newState);
            }
        });
    }

    if ($btnFontUp.length) {
        $btnFontUp.on("click keydown", function (e) {
            if (e.type === "click" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();

                const isPressed = $(this).attr("aria-pressed") === "true";
                const newState = !isPressed;

                $(this).attr("aria-pressed", newState);
                $("html").css("font-size", newState ? "120%" : "100%");
            }
        });
    }

    

    const $target = $("#target");

    if ($target.length) {
        let score = 0;
        let timeLeft = 30;
        let isPaused = false;
        let timerId;
        let moveIntervalId;

        const $score = $("#score");
        const $time = $("#time");
        const $gameArea = $("#gameArea");
        const $message = $("#message");
        const $pauseBtn = $("#pauseBtn");

        function startGameUI() {

            $gameArea.hide().fadeIn(800);

            showAndMoveTarget();

            // Este es un temporizador!!
            timerId = setInterval(function () {
                if (isPaused) return;

                timeLeft--;
                $time.text(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    clearInterval(moveIntervalId);

                    // Es esta parte aparece el punto y vuelve a desaparecer,   (Me costo crearla, no se porque  :(  )
                    $target.fadeOut(400, function () {
                        window.location.href = "/Game/End?score=" + score;
                    });
                }
            }, 1000);

            // En esta parte se mueve el objeto en un tiempo predeterminado
            moveIntervalId = setInterval(function () {
                if (!isPaused) {
                    animateMoveTarget();
                }
            }, 800);
        }

        function randomPosition() {
            let maxX = $gameArea.width() - $target.width();
            let maxY = $gameArea.height() - $target.height();

            let x = Math.random() * maxX;
            let y = Math.random() * maxY;

            return { left: x, top: y };
        }

        // Aqui se encuentra en FadeIn
        function showAndMoveTarget() {
            let pos = randomPosition();
            $target
                .css({ left: pos.left, top: pos.top })
                .fadeIn(400);
        }

        // Aqui se encuentra en FadeIn junto al FideOut
        function animateMoveTarget() {
            let pos = randomPosition();

            $target.fadeOut(150, function () {
                $target
                    .css({ left: pos.left, top: pos.top, transform: "scale(0.8)" })
                    .fadeIn(150, function () {
                        $target.css("transform", "scale(1)");
                    });
            });
        }

        // En esta parte se suman los puntos
        function addPoint() {
            if (isPaused) return;

            score++;
            $score.text(score);

            // Mensaje accesible
            $message.text("¡Punto! Puntaje " + score);

            $score
                .stop(true)
                .animate({ fontSize: "2rem" }, 150)
                .animate({ fontSize: "1.2rem" }, 150);
        }

        // Click con mouse
        $target.on("click", function () {
            addPoint();
        });

        //  teclado para el target (Enter / Espacio)
        $target.on("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                $(this).trigger("click"); // reutiliza la lógica de click
            }
        });

        //  estilos de foco para accesibilidad visual
        $target.on("focus", function () {
            $(this).addClass("target-focus");
        });

        $target.on("blur", function () {
            $(this).removeClass("target-focus");
        });

        // Botón Pausar (mouse + teclado)
        $pauseBtn.on("click keydown", function (e) {
            if (e.type === "click" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();

                isPaused = !isPaused;

                $(this).text(isPaused ? "Reanudar" : "Pausar");
                $(this).attr("aria-pressed", isPaused);

                if (isPaused) {
                    $gameArea.animate({ opacity: 0.5 }, 200);
                    $message.text("Juego en pausa");
                } else {
                    $gameArea.animate({ opacity: 1 }, 200);
                    $message.text("Juego reanudado");
                }
            }
        });

        startGameUI();
    }

});