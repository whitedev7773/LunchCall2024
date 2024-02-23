<script>
    import { onMount } from 'svelte';
    import SettingSublabel from './setting-sublabel.svelte';
    
    let serverStatus = '연결 시도 중';
  
    const fetchServerStatus = async () => {
        serverStatus = '연결 시도 중';
        try {
            const response = await fetch('http://localhost:7773/server-status');
            const data = await response.json();
    
            serverStatus = data.status;
        }
        catch (error) {
            console.error('Error fetching server status:', error);
            serverStatus = '통신 실패';
        }
    };
  
    onMount(() => {
      // 컴포넌트가 마운트될 때 서버 상태를 가져옵니다.
      fetchServerStatus();
    });
</script>

<SettingSublabel label="http://localhost:7773/server-status" />
<main>
    <p>Status : {serverStatus}</p>
    <button on:click={fetchServerStatus}>새로고침</button>
</main>

<style>
main {
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
}

p {
    font-size: 18px;
    color: #555;
}

button {
    padding: 0.5rem 1rem;
    font-size: 14px;
    cursor: pointer;
    border-radius: 10px;
}
</style>
  