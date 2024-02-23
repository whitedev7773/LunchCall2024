<script>
    import "$lib/global.css";

    import Background from "../lib/component/background.svelte";
</script>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css">

<div style="
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            ">
    <Background></Background>
    <slot></slot>
</div>