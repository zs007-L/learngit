<template>
    <ul class="list">
        <li v-for="item in list" :key="item.id" :class="{ active: item.id === activeId }" @click="$emit('toggle', item.id)">
            <span v-text="item.name"></span>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Left",
        props: [ 'list', 'activeId']
    }
</script>

<style scoped>
    .content > .left > .list > li {
        padding: 16px 10px;
        font-size: 12px;
        color: #333;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        text-align: center;
        width: 79px;
    }

    .content > .left > .list > li.active {
        background-color: #FFFFFF;
    }
</style>