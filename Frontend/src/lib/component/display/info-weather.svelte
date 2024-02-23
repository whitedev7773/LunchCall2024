<script>
    import "../../../routes/display/display.css";
    import { weather, weather_interval } from "$lib/shared-data.js";
    import { onMount } from 'svelte';

    const LoadWeather = async () => {
        try {
            const response = await fetch('http://localhost:7773/weather');
            weather.set(await response.json());
        }
        catch (error) {
            alert(`백엔드 서버와 통신을 실패했어요: ${error}`);
        }
    };

    onMount(() => {
        clearInterval($weather_interval);
        LoadWeather();
        weather_interval.set(setInterval(() => {
            LoadWeather();
        }, 600000));
    });
</script>

<style>
    #main {
        margin-top: 6%;
        height: 100%;
        padding: 40px;
        color: white;
    }

    #temp {
        text-align: right;
        opacity: 0.5;
        font-size: 20px;
        line-height: 26px;
    }

    #title {
        font-size: 40px;
    }

    #title-box {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 20px;
    }
    
    #weather {
        /* border: 1px solid #00ff0050; */
        height: 75%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    #morning, #noon {
        /* border: 1px solid #ff0000; */
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    #line {
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        width: 6px;
        height: 90%;
        background-color: #ffffff20;
        border-radius: 10px;
    }

    #time {
        font-size: 30px;
        opacity: 0.7;
        margin-bottom: 20px;
    }

    #desc {
        font-size: 40px;
        text-align: center;
        margin-top: 20px;
    }

    img {
        filter: drop-shadow(0px 0px 20px #0000001f)
    }
</style>

<div id="main" class="container fill">
    <div id="title-box">
        <div id="date-box">
            <p id="title">내일 날씨</p>
            <p style="font-size: 20px">{$weather[1].date.month}월 {$weather[1].date.day}일 ({$weather[1].date.day_name})</p>
        </div>
        <div id="temp">
            <p>최고 {$weather[0].high}°C</p>
            <p>최저 {$weather[0].low}°C</p>
        </div>
    </div>
    <div id="weather">
        <div id="morning">
            <p id="time">09시</p>
            <img id="emoji" src="{$weather[4].weather.icon}.png" width="120px" alt="morning"/>
            <div>
                <p id="desc" class="bold">{$weather[4].weather.status}</p>
                <p class="bold" style="text-align: center; opacity: 0.7; font-size: 20px">{$weather[4].weather.desc}</p>
            </div>
        </div>
        <div id="line"></div>
        <div id="noon">
            <p id="time">15시</p>
            <img id="emoji" src="{$weather[6].weather.icon}.png" width="120px" alt="morning"/>
            <div>
                <p id="desc" class="bold">{$weather[6].weather.status}</p>
                <p class="bold" style="text-align: center; opacity: 0.7; font-size: 20px">{$weather[6].weather.desc}</p>
            </div>
        </div>
    </div>
</div>