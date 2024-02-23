<script>
    import "../../routes/admin/admin.css";
    import SettingLabel from "$lib/component/setting-label.svelte";
    import SettingSublabel from "$lib/component/setting-Sublabel.svelte";
    import SettingSection from "$lib/component/setting-section.svelte";
    import Empty from "$lib/component/empty.svelte";
    import { setting } from "$lib/shared-data.js";

    const number_name =  ["첫", "두", "세"];
    export let section_number = 1;

    function Show() {
        console.log(
            `${number_name[section_number-1]}번째 호출 데이터 변경 >>`,
            "G" + $setting.order[section_number-1][0],
            "S" + $setting.show_second[section_number-1],
            "D" + $setting.delay[section_number-1]
        );
    }
</script>

<div style="width: 300px">
    <SettingSection>
        <SettingLabel label="{number_name[section_number-1]}번째 호출"/> <Empty space=42/>
        <select bind:value={$setting.order[section_number-1][0]} on:change={Show}>
            <option value="3">3학년</option>
            <option value="2">2학년</option>
            <option value="1">1학년</option>
        </select> <SettingSublabel label="을" /> <Empty space=14/>
        <input type="number" bind:value={$setting.show_second[section_number-1]} on:change={Show} /> <SettingSublabel label="초간 표시" />
    </SettingSection>
    <p style="margin-top:5px;"></p>
    <SettingSection>
        <SettingSublabel label="호출 후 Delay"/> <Empty space=60/>
        <input type="number" bind:value={$setting.delay[section_number-1]} on:change={Show} style="width: 50px"/> <SettingSublabel label="초" />
    </SettingSection>
</div>