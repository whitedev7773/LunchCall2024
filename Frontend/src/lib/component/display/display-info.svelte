<script>
    import "../../../routes/display/display.css";
    import { display } from "$lib/shared-data.js";
    import InfoWeather from "./info-weather.svelte";
    import InfoMenu from "./info-menu.svelte";
    import InfoBanner from "./info-banner.svelte";
</script>

<style>
    #main {
        position: absolute;
        transition: opacity 0.3s linear, transform 0.5s cubic-bezier(.29,.05,.24,.91);
        
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    #grid {
        width: 32%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* border: 1px solid #ff0000; */
    }

    #box-desc {
        height: 30px;
        /* border: 1px solid #ff0000; */
        text-align: center;
        font-size: 20px;
        color: white;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #order {
        min-height: 25%;
        max-height: 25%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
    }

    #emoji {
        font-size: 80px;
        padding: 10px;
        background-color: white;
        filter: drop-shadow(0px 0px 20px #00000030);
        border-radius: 100%;
        margin-left: 30px;
        margin-right: 30px;
    }

    #status {
        font-size: 40px;
    }

    #desc {
        font-size: 30px;
    }
</style>

<div id="main" style="opacity: {$display.showindex}; transform: translateX({100 - 100 * $display.showindex}px)">
    <div id="grid">
        <div id="order" class="container fill">
            <p id="emoji">🍽️</p>
            <div style="color:white; display:flex; flex-direction: column; align-items: left; justify-content: center;">
                <p id="status" class="bold">현재 {$display.mainmessage}</p>
                <p id="desc">{$display.submessage}</p>
            </div>
        </div>
        <InfoWeather />
        <p id="box-desc">By. OpenWeatherMap API</p>
    </div>
    <div id="grid">
        <div class="container fill">
            <InfoMenu />
        </div>
        <p id="box-desc" style="opacity: 0;">1234</p>
    </div>
    <div id="grid">
        <div class="container fill">
            <InfoBanner />
        </div>
        <p id="box-desc">배너 문의 : Instagram @jc_jeil_bsb</p>
    </div>
</div>