<template>
    <canvas id="webgl"></canvas>
</template>

<script>
import {Experience} from './threemain/three-index';

export default {
    setup() {

    },
    mounted() {
        const experience = new Experience(document.querySelector('canvas#webgl'));
        console.log('configurator loaded')
    }
}
</script>

<style lang="scss" scoped>

</style>