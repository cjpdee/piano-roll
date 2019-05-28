<template>
	<div class="topbar">
        <TheFileMenu></TheFileMenu>
        <TheControls></TheControls>
        <TheProjectSetup></TheProjectSetup>
        <TheGridSetup></TheGridSetup>
    </div>
</template>

<script>
import TheFileMenu from "./TheFileMenu";
import TheControls from "./TheControls";
import TheProjectSetup from "./TheProjectSetup";
import TheGridSetup from "./TheGridSetup";
export default {
    name: "TheTopBar",
	components: {
        TheFileMenu,
        TheControls,
        TheProjectSetup,
        TheGridSetup
    }
}
</script>
