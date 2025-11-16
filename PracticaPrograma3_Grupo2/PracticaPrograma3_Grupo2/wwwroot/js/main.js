$(document).ready(function () {

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
            $("#message").text("¡Punto!");

            $score
                .stop(true)
                .animate({ fontSize: "2rem" }, 150)
                .animate({ fontSize: "1.2rem" }, 150);
        }

        $target.on("click", function () {
            addPoint();
        });

        $("#pauseBtn").on("click", function () {
            isPaused = !isPaused;
            $(this).text(isPaused ? "Reanudar" : "Pausar");

            if (isPaused) {
                $gameArea.animate({ opacity: 0.5 }, 200);
            } else {
                $gameArea.animate({ opacity: 1 }, 200);
            }
        });

        startGameUI();
    }

});
