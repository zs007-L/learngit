<template>
    <el-dialog title="管理系统-登录" :visible="true" center width="30%" :show-close="false">
        <el-form label-width="80px" :model="model" ref="form" :rules="rules">
            <el-form-item label="用户名：" prop="name">
                <el-input type="text" placeholder="请输入用户名" v-model="model.name"
                          suffix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pwd">
                <el-input type="password" placeholder="请输入密码" v-model="model.pwd" suffix-icon="el-icon-lock"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="login">确定</el-button>
            <el-button @click="$refs.form.resetFields()">重置</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                model: {name: '', pwd: ''},
                rules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {min: 5, max: 20, message: '用户名长度5-20之间', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 5, max: 20, message: '密码长度5-20之间', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            login() {
                this.$refs.form.validate()
                    .then(flag => {
                        if (flag) return this.$http({url: '/admin/login', data: this.model});
                        else return new Promise(() => {
                        });
                    })
                    .then(token => {
                        this.$cookies.set('token', token);
                        this.$router.replace('/home');
                    })
                    .catch(() => {
                    })
            }
        }
    };
</script>

<style scoped>

</style>