<template>
    <div>
        <span class="decrease" @click="decrease">-</span>
        <span class="count" v-text="count"></span>
        <span class="increase" @click="increase">+</span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['count'],
        methods: {
            decrease() {
                if(this.count > 1) this.$emit('decrease');
            },
            increase() {
                if(this.count < 5) this.$emit('increase');
            }
        }
    }
</script>

<style scoped>
    .count-box>div {
        height: 30px;
        display: flex;
        justify-content: center;
        margin-right: 3px;
    }

    .decrease,
    .increase {
        display: inline-block;
        width: 25px;
        height: 24px;
        text-align: center;
        border: 1px solid #b2b2b2;
    }

    .count {
        display: inline-block;
        width: 30px;
        height: 24px;
        text-align: center;
        border-bottom: 1px solid #b2b2b2;
        border-top: 1px solid #b2b2b2;
        background-color: #ebebeb;
    }
</style>