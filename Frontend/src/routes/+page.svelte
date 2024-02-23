<script>
    import { goto } from '$app/navigation';
</script>

<style>
    #main {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    button {
        border: none;
        width: 300px;
        height: 300px;
        margin: 10px;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        background-color: #ffffff40;
        backdrop-filter: blur(20px);
        box-shadow: 0px 0px 30px 0px #00000030;
    }

    button:hover {
        margin: 30px;
        transform: scale(1.1);
    }

    #footer {
        font-size: 20px;
        color: white;
        opacity: 0.5;
    }

    #top {
        font-size: 40px;
        font-weight: bolder;
        color:white;
        filter: drop-shadow(0px 0px 10px #00000030);
    }

    #bottom {
        font-size: 25px;
        color:white;
        filter: drop-shadow(0px 0px 10px #00000030);
        opacity: 0.5;
    }
</style>

<div id="main">
    <div>
        <button on:click={() => {goto('/admin');}}> 
            <p id="top">Admin</p>
            <p id="bottom">관리자 컨트롤</p>
        </button>
        <button on:click={() => {goto('/display');}}> 
            <p id="top">Display</p>
            <p id="bottom">호출 안내 패널</p>
        </button>
    </div>
    <p id="footer" style="text-align: center;">버튼을 눌러서 이동</p>
</div>