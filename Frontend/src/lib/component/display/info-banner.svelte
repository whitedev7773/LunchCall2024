<script>
    import "../../../routes/display/display.css";
    import { setting, banner_interval } from "$lib/shared-data.js";

    import { onMount } from 'svelte';

    let transform = 0;
    let width = 491;
  
    let banner_list = [];
    const LoadBannerList = async () => {
        const response = await fetch('http://localhost:7773/banner/list');
        banner_list = await response.json();
    };

    onMount(() => {
        LoadBannerList();
        clearInterval($banner_interval);
        transform = 0;
        banner_interval.set(setInterval(() => {
            transform += width;
            if (transform >= width * banner_list.length) {
                transform = 0;
            }
        }, 7000));
    });
</script>

<style>
    #main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #picture {
        margin: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
    }

    img {
        border-radius: 30px;
        float: left;
        max-height: 660px;
        transition: transform 1s ease-in-out;
    }
</style>

<div id="main">
    <div id="picture">
        {#each banner_list ?? [] as file_name}
            <div id="img-box">
                <img src="http://localhost:7773/banners/{file_name}" alt={file_name} width="{width}px" style="transform: translate(-{transform}px;"/>
            </div>
        {/each}
    </div>
</div>