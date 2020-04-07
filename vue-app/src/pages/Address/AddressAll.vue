<template>
    <div class='my-address-picker-wrapper' v-show="isShow" @click.self="Parent">
        <div class='my-address-picker'>
            <div class='my-address-picker-title'>
                <span class='region' v-text="isAddress ? '请选择' : provinceAll"></span>
                <span class='region' v-text="isAddress ? '' : cityEdit"></span>
                <span class='region' v-text="isAddress ? '' : newArea"></span>
                <span class='region' v-text="isAddress ? '' : streetAll"></span>
                <button class='btn-reset' @click="reset">重置</button>
            </div>
            <div class='my-address-picker-content'>
                <ul class='province'>
                    <li v-for="(item, i) in arr" :key="item.code" v-text="item.name" @click="province(i)" v-show="isProvince"></li>
                </ul>
                <ul class='city'>
                    <li v-for="(item, i) in cityAll" :key="item.code" v-text="item.name" v-show="isCity" @click="city(i)"></li>
                </ul>
                <ul class='area'>
                    <li v-for="(item, i) in areaAll" :key="item.code" v-text="item.name" @click="area(i)" v-show="isArea"></li>
                </ul>
                <ul class='street'>
                    <li v-for="(item, i) in areaEdit" :key="item.code" v-text="item.name" @click="street(i)" v-show="isAreaEdit"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import regions from './regions.js';

    export default {
        name: "AddressAll",
        props: [ 'isShow' ],
        data() {
            return {
                arr: [],
                provinceAll: '',
                isAddress: true,
                isProvince: true,
                isCity: true,
                isArea: false,
                isAreaEdit: true,
                cityAll: '',
                cityEdit: '',
                areaAll: '',
                areaEdit: '',
                newArea: '',
                streetAll: '',
                total: '',
            };
        },
        methods: {
            province(i) {
                this.cityAll = this.arr[i].childs;
                this.provinceAll = this.arr[i].name;
                this.isAddress = false;
                this.isProvince = false;
                this.isCity = true;
                this.isArea = false;
                this.isAreaEdit = false;
            },
            city(i) {
                this.areaAll = this.cityAll[i].childs;
                this.cityEdit = this.cityAll[i].name;
                this.isCity = false;
                this.isArea = true;
            },
            area(i) {
                this.areaEdit = this.areaAll[i].childs;
                this.newArea = this.areaAll[i].name;
                this.isArea = false;
                this.isAreaEdit = true;
            },
            street(i) {
                this.streetAll = this.areaEdit[i].name;
                this.total = `${this.provinceAll}${this.cityEdit}${this.newArea}${this.streetAll}`;
                this.Parent();
                this.$emit('totalAddress', this.total);
            },
            Parent() {
                this.$emit('cancel');
            },
            reset() {
                this.provinceAll = '';
                this.cityEdit = '';
                this.newArea = '';
                this.streetAll = '';
                this.isAddress = true;
                this.isProvince = true;
                this.isCity = false;
                this.isArea = false;
                this.isAreaEdit = false;
            }
        },
        created() {
            this.arr = regions;
        }
    }
</script>

<style scoped>
    .my-address-picker-wrapper {
        position: fixed; left: 0; top: 0;
        width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .my-address-picker {
        position: absolute; left: 0; bottom: 0;
        width: 100%; background-color: #fff;
    }
    .my-address-picker-title {
        display: flex; justify-content: space-between; padding: 0 10px; border-bottom: 1px solid #b0b0b0;
    }
    .my-address-picker-title>span { font-size: 12px}
    .my-address-picker-title>span.region {
        height: 40px; line-height: 40px;
        color: #bf1111; padding-left: 10px;
    }
    .my-address-picker-content { height: 280px; overflow: auto; }
    .my-address-picker-content>ul { padding-left: 10px; }
    .my-address-picker-content>ul>li { hieght: 40px; line-height: 40px; color: #666; }
</style>