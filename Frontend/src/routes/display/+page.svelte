<script>
    import "./display.css";
    import DisplayOrder from "../../lib/component/display/display-order.svelte";
    import DisplayInfo from "../../lib/component/display/display-info.svelte";
    import DisplayNavigator from "../../lib/component/display/display-navigator.svelte";
</script>

<style>
    #main {
        margin: 150px 130px 100px 130px;
    }

    #index-1 {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #index-2 {
        position: absolute;
        top: -20px;

        width: 100%;
        height: 111%;
    }
</style>

<div id="main">
    <div id="index-1">
        <DisplayOrder />
        <div id="index-2">
            <DisplayInfo />
        </div>
    </div>
    <DisplayNavigator />
</div>