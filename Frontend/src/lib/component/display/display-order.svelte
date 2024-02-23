<script>
    import "../../../routes/display/display.css";
    import { bg_color, display, common_interval, setting } from "$lib/shared-data.js";

    import { onMount, onDestroy } from 'svelte';

    let seconds = -1;

    var previousMainlabel = "";

    let first = "";
    let second = "";
    let third = "";

    onDestroy(async () => {
        clearInterval($common_interval);
    });

    onMount(async () => {
        await __FetchServerSetting();

        previousMainlabel = $display.mainmessage;

        clearInterval($common_interval);
        common_interval.set(setInterval(async () => {
            seconds += 1;

            if (seconds % 15 == 0) {
                await On15Seconds();
            }
            
            if (seconds % 5 == 0) {
                await __FetchServerSetting();
                await OnFiveSeconds();
            }
            
            await OnSecond();

            // 혹시 모를 int32 오버플로우 방지
            if (seconds >= 101) {
                seconds = 0;
            }

        }, 1000));
    });

    async function __FetchServerSetting() {
        const response = await fetch('http://localhost:7773/setting/read');
        setting.set(await response.json());
    }

    function __GetCurrentDateByTime(hours, minutes) {
        var currentDate = new Date();

        var year = currentDate.getFullYear();
        var month = currentDate.getMonth(); // 월은 0부터 시작하므로 1을 더해야 함
        var day = currentDate.getDate();

        return new Date(year, month, day, hours, minutes);
    }

    function GetTimetable() {
        let new_timetable = [];

        let current_time = __GetCurrentDateByTime($setting.call_start.hour, $setting.call_start.minute);
        
        for (let i = 0; i < 3; i++) {
            let start_time = new Date(current_time);

            current_time.setSeconds(
                current_time.getSeconds() + $setting.show_second[i]
            );  // For End
            let end_time = new Date(current_time);

            current_time.setSeconds(
                current_time.getSeconds() + $setting.delay[i]
            );
            let delay_end = new Date(current_time);

            let schedule = {
                grade: $setting.order[i][0],
                bg_color: $setting.order[i][1],
                start_time: start_time,
                end_time: end_time,
                delay_end: delay_end
            }

            new_timetable.push(schedule);
        }

        $display.timetable = new_timetable;
        return $display.timetable;
    }

    // 1초마다 실행됨
    async function OnSecond() {
        let current_time = new Date();

        first = `${$display.timetable[0].start_time.getHours()}:${$display.timetable[0].start_time.getMinutes()} ${$display.timetable[0].grade}학년`;
        second = `${$display.timetable[1].start_time.getHours()}:${$display.timetable[1].start_time.getMinutes()} ${$display.timetable[1].grade}학년`;
        third = `${$display.timetable[2].start_time.getHours()}:${$display.timetable[2].start_time.getMinutes()} ${$display.timetable[2].grade}학년`;
        
        $display.timemessage = `${String(current_time.getHours()).padStart(2, "0")}:${String(current_time.getMinutes()).padStart(2, "0")}:${String(current_time.getSeconds()).padStart(2, "0")}`

        $display.timetable.forEach(timetable_object => {
            if (timetable_object.start_time <= current_time && current_time < timetable_object.end_time) {
                $display.mainmessage = `${timetable_object.grade}학년`;
                $display.submessage = "급식실로 이동해주세요";
                $bg_color = timetable_object.bg_color;
            }
            else if (timetable_object.end_time <= current_time && current_time < timetable_object.delay_end) {
                $display.mainmessage = "정리중";
                $display.submessage = "잠시만 기다려 주세요";
                $bg_color = "#34495e";
            }
            else if (timetable_object.delay_end <= current_time) {
                $display.mainmessage = "대기중";
                $display.submessage = "아직 수업시간이에요";
                $bg_color = "#192a56";
            }
        });
        
        console.count("second");
        ////////////////// 이 위에 코드를 작성할 것 ///////////////////
        var currentMainlabel = $display.mainmessage;

        if (previousMainlabel !== currentMainlabel) {
            console.log("Main Label 값 변경됨");
            OnChangeMainLabel(previousMainlabel, currentMainlabel);
            previousMainlabel = currentMainlabel;
        }
    }

    // 5초마다 실행됨
    async function OnFiveSeconds() {
        console.count("Five");
    }

    // 15초마다 실행됨
    async function On15Seconds() {
        console.table(GetTimetable());
    }

    async function OnChangeMainLabel(prev, changed) {
        console.log(`${prev} >> ${changed}`);
        audio.src = `sounds/${$setting.voice}.mp3`;
        if (!$setting.is_mute) {
            audio.play();
        }
    }

    let audio;
</script>

<style>
    #subbox {
        position: relative;
        margin-bottom: 74px;
        height: 680px;
        background-color: #ffffff20;
        border-radius: 10px 50px 50px 10px;
        transition: opacity 0.3s linear, transform 0.5s cubic-bezier(.29,.05,.24,.91);
    }

    #mainbox {
        display: flex;
        align-items: center;
        justify-content: left;
        margin-bottom: 74px;
        height: 490px;
        background-color: #ffffff20;
        border-radius: 10px 50px 50px 50px;
    }

    #status-bar {
        position: absolute;
        width: 40px;
        height: 680px;
        transition: background-color 0.4s ease-in-out;
        box-shadow: 0px 0px 30px 0px #00000020;
        border-radius: 10px;
    }

    #status-bar-2 {
        position: absolute;
        bottom: 0;
        width: 40px;
        transition: background-color 0.4s ease-in-out;
        box-shadow: 0px 0px 30px 0px #00000020;
        border-radius: 10px;
    }

    #main-title {
        margin-top: 30px;
        margin-left: 120px;
        color: white;
        font-size: 280px;
        filter: drop-shadow(0px 0px 20px #00000020)
    }

    #sub-title {
        margin-left: 120px;
        color: white;
        font-size: 70px;
        filter: drop-shadow(0px 0px 20px #00000020)
    }

    #face {
        position: absolute;
        top: 50px;
        right: 80px;
        color: white;
        font-size: 100px;
        opacity: 0.6;
    }

    #time-box {
        text-align: right;
        color: white;
    }

    #time-start {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
        gap: 30px;
    }

    #time-desc {
        font-size: 46px;
    }

    #time-start {
        font-size: 30px;
        opacity: 0.5;
    }

    #subbox2 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: -30px;
        margin-right: 50px;
    }

    audio {
        position: absolute;
        transform: scale(0, 0);
    }
</style>

<audio bind:this={audio} controls></audio>
<div id="subbox" class="shadow-main" style="opacity: {1 - $display.showindex}; transform: translateX({-100 + 100 * (1 - $display.showindex)}px)">
    <p id="face" class="extrabold">{$display.face}</p>
    <div id="status-bar" style="background-color: {$bg_color}30;">
        <div id="status-bar-2" style="background-color: {$bg_color}; height: {$display.remain}%"></div>
    </div>
    <div id="mainbox" class="shadow-main">
        <p id="main-title" class="extrabold">{$display.mainmessage}</p>
    </div>
    <div id="subbox2">
        <p id="sub-title">{$display.submessage}</p>
        <div id="time-box">
            <p id="time-desc" class="bold">{$display.timemessage}</p>
            <div id="time-start">
                <p id="first">{first}</p>
                <p id="second">{second}</p>
                <p id="third">{third}</p>
            </div>
        </div>
    </div>
</div>