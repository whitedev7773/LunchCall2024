<script>
    export let BUILD = "24.0201"

    import { onMount } from 'svelte';
    import { setting } from "$lib/shared-data.js";

    const LoadSetting = async () => {
        try {
            const response = await fetch('http://localhost:7773/setting/read');
            setting.set(await response.json());
            console.log($setting);
        }
        catch (error) {
            alert(`백엔드 서버와 통신을 실패했어요: ${error}`);
        }
    };
  
    onMount(() => {
        LoadSetting();
    });
</script>

<style>
#main {
    width: fit-content;
    height: fit-content;
    background-color: white;
    box-shadow: 0px 0px 20px 2px #00000030;
    border-radius: 14px;
    overflow: hidden;

    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -10%);

    animation: admin-start 0.8s cubic-bezier(.28,.12,.06,.93) 0.3s 1 forwards;
}

#content {
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

#nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #0984e3;
    padding: 20px;
    color: white;
}

#nav > #app-title {
    text-align: left;
}

#nav > #app-info {
    text-align: right;
}

p.title {
    font-size: 20px;
}

p.subtitle {
    font-size: 14px;
    opacity: 0.5;
}

p.build {
    font-size: 14px;
    letter-spacing: 0px;
    opacity: 0.5;
}

p.developer {
    opacity: 0.5;
}

@keyframes admin-start {
    0% {
        opacity: 0;
        transform: translate(-50%, -10%);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}
</style>

<div id="main">
    <div id="content">
        <slot></slot>
    </div>
    <div id="nav">
        <div id="app-title">
            <p class="title extrabold">급식 호출 알리미</p>
            <p class="subtitle regular">관리자 컨트롤 패널</p>
        </div>
        <div id="app-info">
            <p class="build light">Build {BUILD}</p>
            <p class="developer bold">By. 기원</p>
        </div>
    </div>
</div>