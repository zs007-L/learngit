<template>
    <el-container class="page-wrapper">
        <el-header><h1>后台管理</h1></el-header>
        <el-container>
            <el-aside>
                <el-menu text-color="#fff" background-color="#303133" @select="addTab" :default-active="activeTabName">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>系统设定</span>
                        </template>
                        <el-menu-item index="password">
                            <i class="el-icon-lock"></i>
                            <span slot="title">密码修改</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>商品信息维护</span>
                        </template>
                        <el-menu-item index="category">
                            <i class="el-icon-menu"></i>
                            <span slot="title">商品分类</span>
                        </el-menu-item>
                        <el-menu-item index="product">
                            <i class="el-icon-goods"></i>
                            <span slot="title">商品信息</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <el-tabs type="card" closable v-model="activeTabName" @tab-remove="removeTab">
                    <el-tab-pane v-for="tab in tabs" :key="tab" :name="tab">
						<span slot="label">
							<i :class="tabsMap[tab].iconClass"></i>
							{{ tabsMap[tab].label }}
						</span>
                        <component :is="tabsMap[tab].component"></component>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import Welcome from './Welcome';
    import Category from './Category';
    import Product from './Product';
    import Password from './Password';

    export default {
        data() {
            return {
                activeTabName: 'welcome',
                tabs: ['welcome'],
                tabsMap: {
                    welcome: {
                        label: '欢迎',
                        iconClassL: 'el-icon-chat-line-round',
                        component: Welcome
                    },
                    password: {
                        label: '密码修改',
                        iconClass: 'el-icon-lock',
                        component: Password
                    },
                    product: {
                        label: '商品信息',
                        iconClass: 'el-icon-menu',
                        component: Product
                    },
                    category: {
                        label: '商品分类',
                        iconClass: 'el-icon-goods',
                        component: Category
                    }
                }
            };
        },
        methods: {
            addTab(index) {
                if (this.tabs.indexOf(index) === -1) this.tabs.push(index);
                this.activeTabName = index;
            },
            removeTab(name) {
                let i = this.tabs.indexOf(name);
                this.tabs.splice(i, 1);
                if (this.activeTabName === name) {
                    this.activeTabName = this.tabs.length > 0 ? this.tabs[0] : '';
                }
            }
        }
    };
</script>

<style scoped>
    .page-wrapper {
        width: 100%;
        height: 100%;
    }

    .el-header {
        background-color: black;
        color: white;
    }

    .el-aside {
        background-color: #303133;
    }

    .el-menu {
        border-right: none;
    }

    .el-header {
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 26px;
        background-color: black;
        text-shadow: 0 -1px 0 #fff;
    }
</style>