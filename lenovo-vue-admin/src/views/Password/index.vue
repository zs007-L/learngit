<template>
	<el-form label-width="100px" ref="form" :model="model" :rules="rules" status-icon>
		<el-form-item label="原始密码：" prop="oldPwd">
			<el-input type="password" v-model="model.oldPwd"></el-input>
		</el-form-item>
		<el-form-item label="新密码：" prop="newPwd">
			<el-input type="password" v-model="model.newPwd"></el-input>
		</el-form-item>
		<el-form-item label="确认密码：" prop="checkNewPwd">
			<el-input type="password" v-model="model.checkNewPwd"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="changePwd">提交</el-button>
			<el-button @click="$refs.form.resetFields()">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
        export default {
                name: 'password',
                data() {
                        return {
                                model: {
                                        oldPwd: '',
                                        newPwd: '',
                                        checkNewPwd: ''
                                },
                                rules: {
                                        oldPwd: [
                                                { required: true, message: '原始密码不能为空', trigger: 'blur' },
                                                { min: 5, max: 20, message: '密码长度5-20', trigger: 'blur' }
                                        ],
                                        newPwd: [
                                                { validator: (rule, value, callback) => {
                                                        if(value === '') callback(new Error('新密码不能为空'));
                                                        else if(value.length < 5 || value.length > 20) callback(new Error('密码长度5-20'));
                                                        else {
                                                                if(this.model.checkNewPwd !== '') this.$refs.form.validateField('checkNewPwd');
                                                                callback();
                                                        }
                                                }, trigger: 'blur'}
                                        ],
                                        checkNewPwd: [
                                                { validator: (rule, value, callback) => {
                                                        if(value === '') callback(new Error('确认密码不能为空'));
                                                        else if(value !== this.model.newPwd) callback(new Error('两次输入密码不一致！'));
                                                        else callback();
                                                }, trigger: 'blur'}
                                        ]
                                }
                        };
                },
                methods: {
                        changePwd() {
                                this.$refs.form.validate()
                                        .then(flag =>{
                                                if(flag) {
                                                        this.$http({ url: '/admin/changepwd', data: this.model })
                                                                .then(() => this.$refs.form.resetFields())
                                                }
                                                else return new Promise(() =>{})
                                        })
                                        .catch(() => {})
                        }
                }
        };
</script>

<style scoped>
	.el-form {
		width: 500px;
	};
</style>