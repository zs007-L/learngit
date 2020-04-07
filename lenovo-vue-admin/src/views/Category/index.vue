<template>
    <div>
        <el-tree :expand-on-click-node="false" :data="treeData" :default-expand-all="false">
            <div slot-scope="{ node, data }" class="list-wrapper">
                <span v-text="data.name"></span>
                <div class="right">
                    <!--三级分类没有新增图标-->
                    <i class="el-icon-plus" v-if="data.id === 0 || data.fid === 0 || !data.avatar"
                       @click="beginAdd(data)"></i>
                    <!--根节点没有修改图标-->
                    <i class="el-icon-edit-outline" v-if="data.id !== 0" @click="updateApp(data)"></i>
                    <!--只有三级分类才有删除图标-->
                    <i class="el-icon-delete" v-if="!data.children" @click="removeHandler(data)"></i>
                    <el-popover placement="right" trigger="hover" v-if="data.avatar">
                        <el-image :src="data.avatar" style="width: 200px;"></el-image>
                        <!--只有一级分类和三级分类才有图片预览-->
                        <i class="el-icon-picture" v-if="data.avatar" slot="reference"></i>
                    </el-popover>
                </div>
            </div>
        </el-tree>
        <el-dialog
                :visible="edit.status"
                :show-close="false"
                :title="`商品分类-${ edit.mode ? '新增' : '修改'}`"
                width="700px">
            <el-form label-width="100px" :model="edit.model">
                <el-form-item label="父级分类：">
                    ROOT
                    <span style="margin: 0 10px;">--</span>
                    <el-select v-model="edit.select.main.value" v-show="edit.select.main.isShow"
                               :disabled="edit.select.main.disabled">
                        <el-option v-for="item in mainList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                    <span style="margin: 0 10px;">--</span>
                    <el-select v-model="edit.select.sub.value" v-show="edit.select.sub.isShow"
                               :disabled="edit.select.sub.disabled">
                        <el-option v-for="item in subList" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称：">
                    <el-input v-model="edit.model.name"></el-input>
                </el-form-item>
                <el-form-item label="分类图片：" v-show="edit.level !== 2">
                    <div class="avatar-wrapper">
                        <div class="old-avatar-wrapper" v-show="!edit.mode">
                            <el-image :src="edit.model.avatar" class="old-avatar"></el-image>
                            <p>原图片</p>
                        </div>
                        <div class="new-avatar-wrapper">
                            <el-upload
                                    ref="upload"
                                    name="avatar"
                                    list-type="picture-card"
                                    accept=".jpg,.png"
                                    action="category/upload"
                                    :before-upload=" beforeUploadHandler"
                                    :on-success="uploadSuccessHandler"
                                    :on-remove="uploadRemoveHandler">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button @click="edit.status=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {createNamespacedHelpers} from 'vuex';

    let {mapState, mapActions} = createNamespacedHelpers('category');

    export default {
        name: 'Category',
        data() {
            return {
                edit: {
                    status: false,
                    mode: true,
                    model: {id: -1, name: '', fid: -1, avatar: null, newAvatar: null},
                    level: 0,
                    select: {
                        main: {isShow: true, value: '', disabled: false},
                        sub: {isShow: true, value: '', disabled: false}
                    }
                }
            };
        },
        computed: {
            ...mapState(['list']),
            treeData() {
                let root = {id: 0, name: 'ROOt'};
                this._updateChildNode(root);
                return [root];
            },
            mainList() {
                return this.list.filter(item => item.fid === 0);
            },
            subList() {
                return this.list.filter(item => item.fid === this.edit.select.main.value);
            }
        },
        methods: {
            ...mapActions(['init', 'add', 'remove', 'update']),
            _updateChildNode(node) {
                let children = this.list.filter(item => item.fid === node.id);
                if (children.length === 0) return;
                else {
                    node.children = [];
                    let childNode = null;
                    children.forEach(item => {
                        childNode = Object.assign({}, item);
                        this._updateChildNode(childNode);
                        node.children.push(childNode);
                    })
                }
            },
            removeHandler(node) {
                this.$confirm(`确定要删除分类：${node.name}?`, '提示', {showClose: false, type: 'warning'})
                    .then(() => this.remove({id: node.id, avatar: node.avatar}))
                    .catch(() => {});
            },
            beginAdd(node) {
                this.edit.select.main.disabled = true;
                this.edit.select.sub.disabled = true;
                if (node.id === 0) {
                    this.edit.select.main.isShow = false;
                    this.edit.select.sub.isShow = false;
                    this.edit.level = 1;
                } else if (node.fid === 0) {
                    this.edit.select.main.isShow = true;
                    this.edit.select.sub.isShow = false;
                    this.edit.select.main.value = node.id;
                    this.edit.level = 2;
                } else {
                    this.edit.select.main.isShow = true;
                    this.edit.select.sub.isShow = true;
                    this.edit.select.main.value = node.fid;
                    this.edit.select.sub.value = node.id;
                    this.edit.level = 3;
                }
                this.edit.model.name = '';
                this.edit.model.fid = node.id;
                this.edit.mode = true;
                this.edit.status = true;
            },
            updateApp(node) {
                if (node.fid === 0) {
                    this.edit.select.main.isShow = false;
                    this.edit.select.sub.isShow = false;
                    this.edit.level = 1;
                } else if (!node.avatar) {
                    this.edit.select.main.isShow = true;
                    this.edit.select.main.disabled = false;
                    this.edit.select.main.value = node.fid;
                    this.edit.select.sub.isShow = false;
                    this.edit.level = 2;
                } else {
                    this.edit.select.main.isShow = true;
                    this.edit.select.main.disabled = false;
                    this.edit.select.main.value = this.list.find(item => item.id === node.fid).fid;
                    this.edit.select.sub.isShow = true;
                    this.edit.select.sub.disabled = false;
                    this.edit.select.sub.value = node.fid;
                    this.edit.level = 3;
                }
                this.edit.model.name = node.name;
                this.edit.model.id = node.id;
                this.edit.model.fid = node.fid;
                this.edit.model.avatar = node.avatar;
                this.edit.mode = false;
                this.edit.status = true;
            },
            beforeUploadHandler(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if ((!isJPG) && (!isPNG)) {
                    this.$message.error('图片必须为jpg或png类型');
                }
                if (!isLt2M) {
                    this.$message.error('图片必须小于2M');
                }
                return (isJPG || isPNG) && isLt2M;
            },
            uploadSuccessHandler(response, file, fileList) {
                if (response.status === 200) {
                    this.edit.model.newAvatar = response.data;
                    if (fileList.length > 1) fileList.splice(0, 1);
                }
            },
            save() {
                if (this.edit.mode) {
                    this.add(this.edit.model).then(() => this.edit.status = false);
                } else {
                    this.update(this.edit.model)
                        .then(() => {
                            let {id, fid, name, avatar, newAvatar} = this.edit.model;
                            if (this.edit.level === 2) avatar = null;
                            else if (newAvatar) avatar = `/images/category${newAvatar}`;
                            else {
                            }
                            let model = {id, fid, name, avatar};
                            this.edit.status = false;
                            return model
                        })
                        .then(model => this.$store.commit('category/update', model));
                }
            },
            uploadRemoveHandler(file, fileList) {
                this.edit.model.newAvatar = null;
            }
        },
        watch: {
            'edit.select.main.value'(newValue, oldValue) {
                if (!this.edit.mode && this.edit.level === 3) {
                    this.edit.select.sub.value = this.subList.length > 0 ? this.subList[0].id : '';
                }
                if (!this.edit.mode && this.edit.level === 2) {
                    this.edit.model.fid = newValue;
                }
            },
            'edit.select.sub.value'(newValue, oldValue) {
                if (!this.edit.mode && this.edit.level === 3) {
                    this.edit.model.fid = newValue;
                }
            },
            'edit.status'(newValue, oldValue) {
                if (!newValue) {
                    this.$refs.upload.clearFiles();
                    this.edit.model.id = -1;
                    this.edit.model.fid = -1;
                    this.edit.model.name = '';
                    this.edit.model.avatar = null;
                    this.edit.model.newAvatar = null;
                }
            }
        },
        created() {
            this.init();
        }
    };
</script>

<style scoped>
    .el-tree {
        width: 500px;
    }

    .list-wrapper {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
    }

    .old-avatar-wrapper > p {
        text-align: center;
    }

    .avatar-wrapper {
        display: flex;
    }

    .old-avatar {
        width: 148px;
        margin-right: 10px;
    }
</style>