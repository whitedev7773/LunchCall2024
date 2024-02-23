<script>
    import "../../routes/admin/admin.css";
    import SettingLabel from "$lib/component/setting-label.svelte";
    import SettingSublabel from "$lib/component/setting-Sublabel.svelte";
    import SettingSection from "$lib/component/setting-section.svelte";
    import Empty from "$lib/component/empty.svelte";

    import { setting } from "$lib/shared-data.js";

    function Show() {
        console.log(
            "호출 시작 시간 변경 >>",
            "H" + $setting.call_start.hour,
            "M" + $setting.call_start.minute
        );
    }
</script>

<div>
    <SettingSection>
        <SettingLabel label="호출 시작"/> <Empty space=60/>
        <input type="number" bind:value={$setting.call_start.hour} on:change={Show} /> <SettingSublabel label="시" /> <Empty space=10/>
        <input type="number" bind:value={$setting.call_start.minute} on:change={Show} /> <SettingSublabel label="분" />
    </SettingSection>
</div>