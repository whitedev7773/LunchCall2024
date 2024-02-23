<script>
    import "../../../routes/display/display.css";
    import { menu, menu_interval } from "$lib/shared-data.js";
    import { onMount } from 'svelte';

    const LoadMenu = async () => {
        try {
            const response = await fetch('http://localhost:7773/menu');
            menu.set(await response.json());
        }
        catch (error) {
            alert(`백엔드 서버와 통신을 실패했어요: ${error}`);
        }
    };

    onMount(() => {
        clearInterval($menu_interval);
        LoadMenu();
        menu_interval.set(setInterval(() => {
            LoadMenu();
        }, 600000));
    });
</script>

<style>
    #main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    #title, #menu {
        text-align: center;
        color: white;
    }

    #title {
        font-size: 50px;
        margin-top: 50px;
    }

    #menu {
        margin: 8px 0px 8px 0px;
    }

    #menu-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 20px;
        font-size: 30px;
    }
</style>

<div id="main">
    <p id="title" class="bold">🍽️ 오늘의 중식 🍽️</p>
    <div style="width: 80%; height: 4px; background-color: #ffffff40; margin: 30px 0px 30px 0px; border-radius: 20px"></div>
    <div id="menu-box">
        {#each $menu.중식 ?? [] as m}
            <p id="menu">{m}</p>
        {/each}
    </div>
</div>