<script>
    export let label = "Container";
</script>

<style>
#main {
    margin: 8px;
}

p {
    font-size: 13px;
    margin-left: 10px;
    margin-bottom: 8px;
}

#content {
    padding: 14px;
    background-color: white;
    border: 1px solid #07508830;
    border-radius: 14px;
    transition: box-shadow 0.3s ease-in-out;
}

#content:hover {
    box-shadow: 0px 0px 10px 0px #23508320;
}
</style>

<div id="main">
    <p>{label}</p>
    <div id="content">
        <slot></slot>
    </div>
</div>