<script>
    import "./admin.css"
    import Admin from "../../lib/component/admin.svelte";
    import SettingContainer from "$lib/component/setting-container.svelte";
    import SettingGradeTime from "$lib/component/setting-grade-time.svelte";
    import SettingStartTime from "../../lib/component/setting-start-time.svelte";
    import SettingColor from "../../lib/component/setting-color.svelte";
    import SettingVoice from "../../lib/component/setting-voice.svelte";
    import SettingSave from "../../lib/component/setting-save.svelte";
    import SettingServerStatus from "../../lib/component/setting-server-status.svelte";
    import SettingBanner from "../../lib/component/setting-banner.svelte";

    import { bg_color } from "$lib/shared-data.js";

    $bg_color = "#0984e3"
</script>

<Admin>
    <div style="display: flex;">
        <div style="max-height: 420px;">
            <SettingContainer label="학년 순서 변경">
                <SettingStartTime />
                <p style="margin-top:30px;"></p>
                <SettingGradeTime section_number=1 />
                <p style="margin-top:20px;"></p>
                <SettingGradeTime section_number=2 />
                <p style="margin-top:20px;"></p>
                <SettingGradeTime section_number=3 />
            </SettingContainer>
    
            <SettingContainer label="백엔드 서버 상태">
                <SettingServerStatus />
            </SettingContainer>
        </div>
        <div style="width: 330px;">
            <SettingContainer label="디자인">
                <SettingColor section_number=1 />
                <p style="margin-top:10px;"></p>
                <SettingColor section_number=2 />
                <p style="margin-top:10px;"></p>
                <SettingColor section_number=3 />
            </SettingContainer>
    
            <SettingContainer label="호출 SFX">
                <SettingVoice />
            </SettingContainer>
            
            <SettingContainer label="설정 저장">
                <SettingSave />
            </SettingContainer>
        </div>
        <div>
            <SettingContainer label="배너 설정">
                <SettingBanner />
            </SettingContainer>
        </div>
    </div>

</Admin>