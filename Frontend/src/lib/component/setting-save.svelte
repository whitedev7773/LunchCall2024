<script>
    import SettingSublabel from "./setting-sublabel.svelte";
    import { setting } from "$lib/shared-data.js";
    import { goto } from '$app/navigation';

    let save_button;
    let date = $setting.last_save;

    const SaveSetting = async () => {
        let current_date = new Date();
        $setting.last_save.year = current_date.getFullYear();
        $setting.last_save.month = current_date.getMonth() + 1;
        $setting.last_save.day = current_date.getDate();
        $setting.last_save.hour = current_date.getHours();
        $setting.last_save.minute = current_date.getMinutes();
        $setting.last_save.second = current_date.getSeconds();

        try {
            const response = await fetch('http://localhost:7773/setting/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify($setting),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            alert("저장 완료");
        } catch (error) {
            console.error('Error:', error);
            alert(`저장 실패 ${error}`);
        }
    }
</script>

<style>
    #main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: right;
    }

    #savebox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }

    button {
        border-radius: 10px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    #display {
        height: 50px;
        font-size: 15px;
    }

    #display:hover {
        background-color: #0984e3;
        color: white;
    }

    #save {
        padding: 8px 18px 8px 18px;
    }

    #save {
        background-color: #0984e3;
        color: white;
    }

    #save:hover {
        background-color: #2ea3fd;
    }
</style>

<div id="main">
    <button id="display" on:click={() => {goto('/display');}}>Display 패널로 이동</button>
    <div id="savebox">
        <SettingSublabel label="최근 변경 {$setting.last_save.year}년 {$setting.last_save.month}월 {$setting.last_save.day}일 {$setting.last_save.hour}:{$setting.last_save.minute}:{$setting.last_save.second}" />
        <div id="button">
            <button id="save" on:click={ SaveSetting }>저장</button>
        </div>
    </div>
</div>