<template>
    <div class="page-wrapper">
        <div class="header">
            <LenovoHeader></LenovoHeader>
        </div>
        <div class="content">
            <ul v-show="isShowAdd">
                <li v-for="(item, i) in list" :key="item.id">
                    <div class='address-list-item' @click="closeAddress(item.id)">
                        <span class='receive-name' v-text="item.receiveName"></span>
                        <span class='receive-phone' v-text="item.receivePhone"></span>
                    </div>
                    <div class='receive-address' @click="closeAddress(item.id)">
                        <span class='receive-regon' v-text="item.receiveRegon"></span>
                        <span class='receive-detail' v-text="item.receiveDetail"></span>
                    </div>
                    <div class='operation clearfix'>
                        <span class='lf default' :class="item.isDefault ? 'red' : ''" v-text="item.isDefault ? '默认地址' : '设为默认地址'" @click="isdefault(item.id)"></span>
                        <span class='rt delete' @click="remove(i)">删除</span>
                        <img src='./shanchu.png' class='rt delete-t'/>
                        <span class='rt edit' @click="edit(item)">编辑</span>
                        <img src='./bianji.png' class='rt edit-t'/>
                    </div>
                </li>
            </ul>
            <form action="" v-show="isShow">
                <div>
                    <label for="">收货人:</label>
                    <input type="text" placeholder="请输入收货人姓名" class="name" v-model="addNumber.receiveName">
                </div>
                <div>
                    <label for="">手机号码:</label>
                    <input type="text" placeholder="请输入手机号码" class="phone" v-model="addNumber.receivePhone">
                </div>
                <div>
                    <label for="">所在地区:</label>
                    <input type="text" class="region" placeholder="请输入省市区" readonly="readonly" v-model="addNumber.receiveRegon" @click="isAddressAll = true">
                </div>
                <div>
                    <label for="">详细地址:</label>
                    <input type="text" placeholder="请输入详细地址" class="detailed-address" v-model="addNumber.receiveDetail">
                </div>
            </form>
            <div class="btn-wrapper">
                <button class="address" @click="addedAddress" v-show="isShowAdd">+新增地址</button>
                <button class="btn-prese" v-show="isShow" @click="beginEdit">保存</button>
            </div>
        </div>
        <AddressAll :isShow="isAddressAll" @cancel="isAddressAll = false" @totalAddress="total" ref="btnReset"></AddressAll>
    </div>
</template>

<script type="text/ecmascript-6">
    import LenovoHeader from '../../components/LenovoHeader.vue';
    import AddressAll from "./AddressAll.vue";

    export default {
        name: "index",
        components: { LenovoHeader, AddressAll },
        data() {
            return {
                list: [],
                isShow: false,
                isShowAdd: true,
                isAdd: false,
                isAddressAll: false,
                totalAddress: '',
                addNumber: {id: 0, receiveName: '', receivePhone: '', receiveRegon: '', receiveDetail: '', isDefault: 0}
            };
        },
        methods: {
            getData() {
                this.$http({ url: '/address/list'})
                    .then(data => {
                        this.list = data;
                    })
            },
            addedAddress() {
                this.isShow = true;
                this.isShowAdd = false;
            },
            newAddress() {
                if(this.addNumber.receiveName !== '' && this.addNumber.receivePhone !== '' && this.addNumber.receiveRegon !== '' && this.addNumber.receiveDetail !== '') {
                    this.$http({ url: '/address/add', data: { jsonStr: JSON.stringify(this.addNumber)}})
                        .then(newId => {
                            this.addNumber.id = newId;
                            this.isShowAdd = true;
                            this.isShow = false;
                            this.getData();
                        })
                }else {
                    alert('内容不能为空！');
                }
            },
            beginEdit() {
                this.$refs.btnReset.reset();
                if(this.isAdd) {
                    this.$http({ url: '/address/update', data: { jsonStr: JSON.stringify(this.addNumber)}})
                        .then(() => {
                            let { id, receiveName, receivePhone, receiveRegon, receiveDetail, isDefault } = this.addNumber;
                            let obj = { id, receiveName, receivePhone, receiveRegon, receiveDetail, isDefault };
                            let i = this.list.findIndex(item => item.id === id);
                            this.list.splice(i, 1, obj);
                            this.isShowAdd = true;
                            this.isShow = false;
                            this.isAdd = false;
                            this.addNumber.id = 0;
                            this.addNumber.receiveName = '';
                            this.addNumber.receivePhone = '';
                            this.addNumber.receiveRegon = '';
                            this.addNumber.receiveDetail = '';
                        })
                } else {
                    this.isAdd = true;
                    this.newAddress();
                }
            },
            //设置默认地址
            isdefault(id) {
                this.$http({ url: `/address/default/${ id }`, method: 'get'})
                    .then(() => {
                        this.addNumber.isDefault = 1;
                        this.getData();
                    })
            },
            //删除地址
            remove(i) {
                let id = this.list[i].id;
                if(confirm('确定删除吗？')) {
                    this.$http({ url: `/address/remove/${ id }`, method: 'get'})
                        .then(() => {
                            this.list.splice(i, 1);
                        })
                }
            },
            //编辑地址
            edit(item) {
                this.isShowAdd = false;
                this.isShow = true;
                this.isAdd = true;
                this.addNumber.id = item.id;
                this.addNumber.receiveName = item.receiveName;
                this.addNumber.receivePhone = item.receivePhone;
                this.addNumber.receiveRegon = item.receiveRegon;
                this.addNumber.receiveDetail = item.receiveDetail;
                this.addNumber.isDefault = item.isDefault;
            },
            total(data) {
                console.log(data);
                this.addNumber.receiveRegon = data;
            },
            closeAddress(id) {
                if(window.location.href.split('?')[1] === 'reference=orderconfirm') {
                    this.$router.push(`../orderconfirm/?addressId=${id}`);
                }
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>
    .content {
        margin-top: 45px;
    }
    .content>.btn-wrapper {
        margin: 70px 30px 10px;
    }
    .content>ul {
        background-color: #FFFFFF;
        border-bottom: 1px solid #D2D2D2;
    }
    .content>ul>li {
        padding: 10px 10px;
        border-top: 1px solid #D2D2D2;
    }
    .content>ul>li>.address-list-item {
        font-size: 14px;
    }
    .content>ul>li>.address-list-item>.receive-phone {
        padding-left: 20px;
    }
    .content>ul>li>.receive-address {
        border-bottom: 1px solid #D2D2D2;
        padding: 10px 0;
        font-size: 12px;
        color: #707070;
    }
    .content>ul>li>.operation {
        font-size: 12px;
        color: #797979;
        height: 30px;
        line-height: 30px;
    }
    .content>ul>li>.operation>.red {
        color: #E2231A;
    }
    .content>ul>li>.operation>span.edit {
        margin-right: 6px;
    }
    .content>ul>li>.operation>img {
        width: 16px;
        margin-top: 8px;
        margin-right: 4px;
    }

    .content>.btn-wrapper>button {
        width: 100%;
        padding: 10px;
        background-color: #e2231a;
        border-radius: 4px;
        color: #FFFFFF;
    }

    .content>form {
        background-color: #FFFFFF;
        padding: 0 10px;
        border-bottom: 1px solid #d2d2d2;
        /*display: none;*/
    }
    .content>form>div {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #d2d2d2;
    }
    .content>form>div:last-child {
        border-bottom: none;
    }
    .content>form>div>label {
        display: inline-block;
        color: #575757;
        font-size: 12px;
        width: 60px;
    }
    .content>form>div>input { width: 80% }
</style>