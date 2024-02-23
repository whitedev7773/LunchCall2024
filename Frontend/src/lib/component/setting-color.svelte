<script>
    import Empty from "$lib/component/empty.svelte";
    import { bg_color } from "../shared-data.js";
    import { setting } from "$lib/shared-data.js";

    const number_name =  ["첫", "두", "세"];
    export let section_number = 3;
</script>

<style>
#color {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
}

button {
    font-size: 13px;
    border-radius: 20px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
}

input {
    cursor: pointer;
}
</style>

<div id="color">
    <p>{[number_name[section_number-1]]}번째 호출 시 배경색</p>
    <Empty space="20"/>
    <input type="color" bind:value={$setting.order[section_number-1][1]} />
    <Empty space="10"/>
    <button style="background-color: {$setting.order[section_number-1][1]}30" on:click={() => {
        bg_color.set($setting.order[section_number-1][1]);
    }}>
        보기
    </button>
</div>