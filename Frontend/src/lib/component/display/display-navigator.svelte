<script>
    import "../../../routes/display/display.css";
    import { display, remain1, remain2 } from "$lib/shared-data.js";
    import { onMount } from 'svelte';

    let progress = {
        order: 0,
        info: 0
    };

    let opacity = {
        order: 1,
        info: 0.5
    }

    function showOrder() {
        $display.showindex = 0;
        opacity.order = 1;
        opacity.info = 0.5;
        remain1.set(setInterval(() => {
            progress.order += 5;
            if (progress.order > 100) {
                progress.order = 0;
                showInfo(); 
                clearInterval($remain1);
            }
        }, 1000));
    }

    // 원ㄹ ㅐ5씩 더해야함
    function showInfo() {
        $display.showindex = 1;
        opacity.order = 0.5;
        opacity.info = 1;
        remain2.set(setInterval(() => {
            progress.info += 5;
            if (progress.info > 100) {
                progress.info = 0;
                showOrder();
                clearInterval($remain2);
            }
        }, 1000));
    }
    
    onMount(() => {
        clearInterval($remain1);
        clearInterval($remain2);
        showOrder();
    });
</script>

<style>
    #nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    button {
        padding: 0; margin: 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;

        width: 32%;
        height: 80px;
        text-align: left;
        font-size: 28px;
        border-radius: 30px;
        background-color: #2e2e2e;

        color: white;
        overflow: hidden;

        transition: opacity 0.3s linear;
    }

    #credit {
        opacity: 0.4;
        text-align: center;
        color: white;
    }

    .emoji {
        margin-left: 14px;
        margin-right: 8px;
        font-size: 36px;
    }

    button > .progress {
        position: relative;
        width: 0px;
        height: 100%;
        background-color: #3d3d3d;
        transition: width 1s linear;
    }

    button > div.text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        position: absolute;
    }
</style>

<div id="nav">
    <button class="shadow" style="opacity: {opacity.order}">
        <div style="width: {progress.order}%;" class="progress"></div>
        <div class="text">
            <p class="emoji">🍽️</p>
            <p class="light">급식 순서</p>
        </div>
    </button>
    <div id="credit">
        <p>Developed By Giwon (2024)</p>
        <p>Github : @whitedev7773</p>
    </div>
    <button class="shadow" style="opacity: {opacity.info}">
        <div style="width: {progress.info}%;"class="progress"></div>
        <div class="text">
            <p class="emoji">💡</p>
            <p class="light">유용한 정보</p>
        </div>
    </button>
</div>