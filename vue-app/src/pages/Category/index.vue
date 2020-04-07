<template>
    <div class="page-wrapper">
        <div class="header">
            <LenovoHeader></LenovoHeader>
        </div>
        <div class="content">
            <div class="left">
                <Left :list="mainList" :active-id="activeId" @toggle="toggleID"></Left>
            </div>
            <div class="right hide-scroll-bar">
                <Right :list="subList" :list2="subList2" :avatar="avatar"></Right>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoHeader from '../../components/LenovoHeader.vue';
    import Left from './Left.vue';
    import Right from './Right.vue';

    export default {
        name: "category",
        components: {Left, LenovoHeader, Right},
        data() {
            return {
                mainList: [],
                activeId: 0,
                subList: [],
                subList2: []
            };
        },
        computed: {
            avatar() {
                let target = this.mainList.find(item => item.id === this.activeId);
                return target ? target.avatar : '';
            }
        },
        methods: {
            getData(fid) {
                return this.$http({ method: 'get', url: `/category/list/${ fid }`})
            },
            toggleID(id) {
                this.activeId = id;
            }
        },
        watch: {
            activeId(newValue, oldValue) {
                this.subList2 = [];
                this.getData(newValue).then(data => this.subList = data);
            },
            subList(newValue, oldValue) {
                newValue.forEach(item => {
                    this.getData(item.id).then(data => this.subList2 = this.subList2.concat(data));
                });
            }
        },
        created() {
            this.getData(0).then(data => {
                this.mainList = data;
                this.activeId = data[0].id
            })
        }
    }
</script>

<style scoped>
    .page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .header {
        width: 100%;
        height: 45px;
        background-color: #e8e8e8;
        flex-shrink: 0;
        position: fixed;
        top: 0;
    }

    .content {
        flex-grow: 1;
        background-color: #eee;
        display: flex;
        margin-top: 45px;
        overflow: hidden;
    }

    .content > .right {
        background-color: #FFFFFF;
        padding: 0 0 0 8px;
        flex-grow: 1;
        overflow: auto;
    }
</style>