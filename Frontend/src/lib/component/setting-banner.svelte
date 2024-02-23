<script>
    import { onMount } from 'svelte';

    let fileInput;
    let progressBars;
    let progressStatus;

    let banner_list = [];

    const LoadBannerList = async () => {
        const response = await fetch('http://localhost:7773/banner/list');
        banner_list = await response.json();
    };
  
    onMount(() => {
        LoadBannerList();
    });


    async function uploadFiles() {
        const files = fileInput.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name); // 파일과 함께 원본 이름 추가
        }

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressStatus.innerHTML = `${percentComplete.toFixed(2)}% uploaded`;
            }
        });

        xhr.open('POST', 'http://localhost:7773/banner/upload'); // 서버 주소를 적절히 변경
        xhr.send(formData);
        setTimeout(async () => {
            progressStatus.innerHTML = `업로드 대기중`;
            await LoadBannerList();
        }, 3000);
    }
</script>

<style>
    #image-button {
        width: 25%;
        position: relative;
        cursor: pointer;
        padding: 0;
        margin: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 5px 4px #00000030;
    }

    #delete {
        position: absolute;
        text-align: center;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 20px;
        background-color: #00000090;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        backdrop-filter: blur(2px);
        padding-top: 30px;
    }

    #image-button:hover > #delete {
        opacity: 1;
    }

    #banner-box {
        height: 200px;
        overflow-y: scroll;
        background-color: #f0f0f0;
        border-radius: 10px;
        margin-bottom: 16px;
    }

    #banner-box::-webkit-scrollbar {
        display: none;
    }

    #upload {
        padding: 10px;
        background-color: #21d667;
        color : black;
        border-radius: 10px;
    }

    #refresh {
        padding: 10px;
        background-color: #e7e0ff;
        color : black;
        border-radius: 10px;
    }

    #fileInput {
        padding: 8px 50px 8px 10px;
        background-color: #e7e0ff;
        color : black;
        border-radius: 10px;
    }
</style>

<div id="main" style="width: 300px; height: 386px;">
    <div id="banner-box">
        {#each banner_list as name}
            <button id="image-button" on:click={async () => {
                await fetch(`http://localhost:7773/banner/delete/${name}`);
                banner_list = banner_list.filter((item) => (item != name));
            }}>
                <p id="delete">삭제</p>
                <img id="img" src="http://localhost:7773/banners/{name}" width="100%" alt="banner"/>
            </button>
        {/each}
    </div>
    <form>
        <input bind:this={fileInput} type="file" id="fileInput" accept="image/jpeg, image/png" /><br><br>
        <button id="upload" type="button" on:click={uploadFiles}>업로드</button>
        <button id="refresh" type="button" on:click={LoadBannerList}>새로고침</button>
    </form>
    <div bind:this={progressStatus} id="progressStatus"></div>
</div>