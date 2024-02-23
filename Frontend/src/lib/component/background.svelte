<script>
    import { bg_color } from "../shared-data.js";
    // export let color = $bg_color;
</script>

<style>
    .bg {
        z-index: -1;
        position: fixed;
        width: 100%;
        height: 100%;
        transition: background-color 0.4s ease-in-out;
    }

    #circle {
        border-radius: 100%;
        background-color: #ffffff29;
        width: 1000px;
        height: 1000px;
        animation: circle 30s ease-in-out;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes circle {
        0% {
            transform: translate(-200px, -200px);
        }
        20% {
            transform: translate(-100px, -150px);
        }
        40% {
            transform: translate(-20px, -80px);
        }
        60% {
            transform: translate(-130px, -50px);
        }
        80% {
            transform: translate(-100px, -80px);
        }
        100% {
            transform: translate(-200px, -200px);
        }
    }

    #square {
        background-color: #ffffff29;
        width: 300px;
        height: 300px;
        animation: square 30s linear;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes square {
        0% {
            transform: translate(100px, -200px) rotate(30deg);
        }
        20% {
            transform: translate(110px, -230px) rotate(66deg);
        }
        40% {
            transform: translate(90px, -170px) rotate(102deg);
        }
        60% {
            transform: translate(100px, -210px) rotate(138deg);
        }
        80% {
            transform: translate(110px, -180px) rotate(174deg);
        }
        100% {
            transform: translate(100px, -200px) rotate(210deg);
        }
    }

    #plus-1 {
        animation: plus-1 30s linear;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes plus-1 {
        0% {
            transform: rotate(30deg);
        }
        100% {
            transform: rotate(300deg);
        }
    }

    #rotate-1 {
        opacity: 0.2;
        position: absolute;
        bottom: 100px;
        right: 230px;
        animation: rotate-1 10s ease-in-out;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes rotate-1 {
        15%, 100% {
            transform: rotate(270deg);
        }
    }

    #square-1 {
        background-color: #ffffff29;
        position: absolute;
        right: 200px;
        top: 200px;
        width: 200px;
        height: 200px;
        animation: square-1 30s linear;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes square-1 {
        0% {
            transform: translate(100px, -200px) rotate(30deg);
        }
        20% {
            transform: translate(110px, -230px) rotate(66deg);
        }
        40% {
            transform: translate(90px, -170px) rotate(102deg);
        }
        60% {
            transform: translate(100px, -210px) rotate(138deg);
        }
        80% {
            transform: translate(110px, -180px) rotate(174deg);
        }
        100% {
            transform: translate(100px, -200px) rotate(210deg);
        }
    }

    #plus-2 {
        animation: plus-2 32s linear;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes plus-2 {
        0% {
            transform: rotate(50deg);
        }
        100% {
            transform: rotate(320deg);
        }
    }

    #rotate-2 {
        opacity: 0.2;
        position: absolute;
        top: 200px;
        right: 650px;
        animation: rotate-2 13s ease-in-out;
        animation-play-state: running;
        animation-iteration-count: infinite;
    }

    @keyframes rotate-2 {
        15%, 100% {
            transform: rotate(270deg);
        }
    }
</style>

<div class="bg" style="background-color: {$bg_color};">
    <div class="bg" style="background:linear-gradient(0deg, #ffffff00 0%, #ffffff50 70%);">
        <div id="circle" />
        <div id="square" />
        <div id="rotate-1">
            <div id="plus-1">
                <div style="background-color: white; width: 50px; height: 200px;"></div>
                <div style="background-color: white; width: 50px; height: 200px; transform: rotate(90deg); position:absolute; top:0;"></div>
            </div>
        </div>
        <div id="rotate-2">
            <div id="plus-2">
                <div style="background-color: white; width: 50px; height: 200px;"></div>
                <div style="background-color: white; width: 50px; height: 200px; transform: rotate(90deg); position:absolute; top:0;"></div>
            </div>
        </div>
        <div id="square-1" />
    </div>
</div>