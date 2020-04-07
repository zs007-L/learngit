<template>
    <i class="lenovo-check-box" :class="{ checked: checked }" @click="$emit('toggle')"></i>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "CartChecked",
        props: ['checked']
    }
</script>

<style scoped>
    i.lenovo-check-box {
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url(./wei.png);
        background-size: 100% 100%;
        position: absolute;
        left:10px;
        top: 50%;
        transform: translateY(-50%);
    }
    i.lenovo-check-box.checked {
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url(./xuanzhong.png);
        background-size: 100% 100%;
    }
    .content>.list>li>.check-box {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
</style>