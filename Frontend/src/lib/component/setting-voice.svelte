<script>
    import { setting } from "$lib/shared-data.js";

    const voice = [
        "아라", "가람", "혜리", "예지", "규원", "주안", "기태", "진호"
    ];
    const sfx = [
        "Note", "Chorus", "Pop", "Aurora", "Piano", "Sunset", "Notify", "Ring"
    ];

    let audio;

    function playaudio(name) {
        audio.src = `sounds/${name}.mp3`
        audio.play();
    }
</script>

<style>
    #main {
        display: flex;
        flex-direction: column;
    }
    
    #voices, #sfxs {
        display: flex;
        flex-wrap: wrap;
    }

    #voices {
        margin-bottom: 20px;
    }

    #sfxs > * {
        display: flex;
        flex-wrap: wrap;
        flex: 0 0 calc(100% / 4);
        box-sizing: border-box;
        margin-bottom: 4px;
    }

    audio {
        position: absolute;
        transform: scale(0, 0);
    }

    #mute-box {
        margin-top: 10px;
        display: flex;
        align-items: left;
        justify-content: left;
    }
</style>

<audio bind:this={audio} id="audioPlayer" controls></audio>

<div id="main">
    <!--
    <div id="voices">
        {#each voice as v}
            <div>
                <input type="radio" id={v} name="sound" value={v} on:click={() => {
                    audio.src = `sounds/${v}.mp3`
                    audio.play();
                }}>
                <label for={v}>{v}</label>
            </div>
        {/each}
    </div>
    -->
    <div id="sfxs">
        {#each sfx as s}
            <div>
                {#if $setting.voice == s}
                    <input type="radio" id={s} name="sound" value={s} checked on:click={() => {
                        playaudio(s);
                        $setting.voice = s;
                    }}>
                {:else}
                    <input type="radio" id={s} name="sound" value={s} on:click={() => {
                        playaudio(s);
                        $setting.voice = s;
                    }}>
                {/if}
                <label for={s}>{s}</label>
            </div>
        {/each}
    </div>
    <div id="mute-box">
        <input type="checkbox" id="mute" name="mute" bind:checked={$setting.is_mute}>
        <label for="mute">음소거</label>
    </div>
</div>