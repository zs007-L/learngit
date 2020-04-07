<template>
    <div>
        <el-form :inline="true" class="form-search" size="mini">
            <el-form-item label="商品名称：">
                <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类别：">
                <el-select v-model="search.mId">
                    <el-option label="-请选择-" :value="0"></el-option>
                    <el-option v-for="item in mainCategoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
                -
                <el-select v-model="search.sId">
                    <el-option label="-请选择-" :value="0"></el-option>
                    <el-option v-for="item in subCategoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
                -
                <el-select v-model="search.cId">
                    <el-option label="-请选择-" :value="0"></el-option>
                    <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetSearchForm">重置查询</el-button>
                <el-button icon="el-icon-search" @click="searchHandler">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="beginAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="productList">
            <el-table-column type="index" width="50" align="center" fixed="left"></el-table-column>
            <el-table-column label="商品名称" prop="name" width="250" show-overflow-tooltip fixed="left"></el-table-column>
            <el-table-column label="商品类别" width="280">
                <template slot-scope="scope">
                    <span v-text="scope.row.mainCategoryName"></span>
                    -
                    <span v-text="scope.row.subCategoryName"></span>
                    -
                    <span v-text="scope.row.categoryName"></span>
                </template>
            </el-table-column>
            <el-table-column label="商品简介" prop="remark" show-overflow-tooltip></el-table-column>
            <el-table-column label="价格(元)">
                <template slot-scope="scope">
                    ￥<span v-text="scope.row.price"></span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="beginUpdate(scope.row)">更新</el-button>
                    <el-button size="mini" type="primary" @click="putProductOnSale(scope.row.id)" v-if="scope.row.status === 0">上架</el-button>
                    <el-button size="mini" type="danger" @click="pullProductOffShelves(scope.row.id)" v-else>下架</el-button>
                </template>
            </el-table-column>
            <el-table-column label="avatar" width="70" align="center" fixed="right">
                <template slot-scope="scope">
                    <i class="el-icon-picture" @click="beginAvatarEdit(scope.row)"></i>
                </template>
            </el-table-column>
            <el-table-column label="banner" width="70" align="center" fixed="right">
                <template slot-scope="scope">
                    <i class="el-icon-picture" @click="beginBannerEdit(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            :current-page="pagination.index"
            :page-sizes="[6,8,10,12]"
            :page-size="pagination.count"
            layout="prev, pager, next, jumper, sizes, total"
            :total="pagination.total"
            @size-change="sizeChangeHandler"
            @current-change="currentChangeHandler">
        </el-pagination>
        <el-dialog
            :visible.sync="avatarDialog.isShow"
            width="700px"
            title="商品avatar - 预览/维护">
            <el-upload
                ref="avatarUpload"
                name="avatar"
                list-type="picture-card"
                :file-list="avatarDialog.fileList"
                :data="{ id: avatarDialog.id }"
                accept=".jpg,.png"
                action="/product/avatar/upload"
                :before-upload="beforeAvatarUpload"
                :before-remove="avatarBeforRemove"
                :on-success="avatarUploadSuccessHandler">
                <i class="el-icon-plus"></i>
                <div slot="tip">只能上传jpg/png格式图片，且图片小于2M</div>
            </el-upload>
        </el-dialog>
        <el-dialog
            :visible.sync="bannerDialog.isShow"
            width="700px"
            title="商品banner - 预览/维护">
            <el-upload
                :multiple="true"
                ref="bannerUpload"
                name="banner"
                :data="{ id: bannerDialog.id }"
                list-type="picture-card"
                :file-list="bannerDialog.fileList"
                accept=".jpg,.png"
                action="/product/banner/upload"
                :before-upload="beforeBannerUploadHandler"
                :before-remove="bannerBeforeRemoveHandler"
                :on-success="bannerUploadSuccessHandler">
                <i class="el-icon-plus"></i>
                <div slot="tip">只能上传jpg/png格式图片，且图片小于2M</div>
            </el-upload>
        </el-dialog>
        <el-dialog
                width="820px"
                class="dialog-edit"
                :visible="editDialog.isShow"
                :show-close="false"
                :close-on-modal="false"
                :close-on-press-escape="false"
                :title="`商品维护 -${ editDialog.mode ? '新增' : '修改'}` ">
            <el-form :model="editDialog.model" label-width="100px" :rules="editDialog.rules" ref="form">
                <el-form-item label="商品名称：" prop="name">
                    <el-input v-model="editDialog.model.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品分类：" prop="cid">
                    <el-select v-model="editDialog.mId" class="mini">
                        <el-option label="-请选择-" :value="0"></el-option>
                        <el-option v-for="item in mainCategoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                    -
                    <el-select v-model="editDialog.sId" class="mini">
                        <el-option label="-请选择-" :value="0"></el-option>
                        <el-option v-for="item in subCategoryListWithEdit" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                    -
                    <el-select v-model="editDialog.model.cid" class="mini">
                        <el-option label="-请选择-" :value="0"></el-option>
                        <el-option v-for="item in categoryListWithEdit" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品简介：" prop="remark">
                    <el-input v-model="editDialog.model.remark" placeholder="请输入商品简介"></el-input>
                </el-form-item>
                <el-form-item label="价格(元)：" prop="price">
                    <el-input v-model="editDialog.model.price"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="editDialog.isShow = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import {createNamespacedHelpers} from 'vuex';
    let {mapState, mapActions} = createNamespacedHelpers('category');

    export default {
        name: 'Product',
        data() {
            return {
                productList: [],
                ajaxData: {name: '', mId: 0, sId: 0, cId: 0},
                //搜索的数据
                search: {name: '', mId: 0, sId: 0, cId: 0},
                pagination: {total: 0, index: 1, count: 6},
                avatarDialog: {isShow: false, id: 0, fileList: []},
                bannerDialog: {isShow: false, id: 0, fileList: []},
                //编辑的数据
                editDialog: {
                    isShow: false,
                    mode: true,
                    model: {id: 0, cid: 0, name: '', remark: '', price: 0},
                    mId: 0,
                    sId: 0,
                    rules: {
                        name: [
                            { required: true, message: '商品名称不能为空', trigger: 'blur'},
                            { max: 20, min: 2, message: '商品长度为2-20', trigger: 'blur'}
                        ],
                        remark: [
                            {min: 10, max: 100, message: '商品简介长度为10-100', trigger: 'blur'}
                        ],
                        cid: [
                            {
                                validator:(rule, value, callback) => {
                                    if(value === 0) {
                                        callback(new Error('商品分类不能为空'));
                                    }else callback();
                                }, trigger: 'change'}
                        ],
                        price: [
                            {
                                validator:(rule, value, callpack) => {
                                    if(value === '')callpack(new Error('价格必填'));
                                    else if(!/^\d+$/.test(value)) callpack(new Error('请输入数字'));
                                    else callpack();
                                }, trigger: 'blur'
                            },
                        ]
                    }
                },

            };
        },
        computed: {
            ...mapState( ['list'] ),
            //搜索和编辑共用的计算属性
            mainCategoryList() {
                return this.list.filter(item => item.fid === 0);
            },
            //搜索使用的计算属性
            subCategoryList() {
                return this.search.mId ? this.list.filter(item => item.fid === this.search.mId) : [];
            },
            categoryList() {
                return this.search.sId ? this.list.filter(item => item.fid === this.search.sId) : [];
            },
            //编辑使用的计算属性
            subCategoryListWithEdit() {
                return this.editDialog.mId ? this.list.filter(item => item.fid === this.editDialog.mId) : [];
            },
            categoryListWithEdit() {
                return this.editDialog.sId ? this.list.filter(item => item.fid === this.editDialog.sId) : [];
            }
        },
        methods: {
            ...mapActions(['init']),
            //获取数据
            getProductData(index = 1) {
                this.$http({
                    url: 'product/admin/list',
                    data: {
                        ...this.ajaxData,
                        begin: (index - 1) * this.pagination.count,
                        count: this.pagination.count,
                    }
                }).then(data => {
                    this.productList = data.list;
                    this.pagination.total = data.total;
                    this.pagination.index = index;
                });
            },
            //分页器每页显示的个数的切换
            sizeChangeHandler(size) {
                this.pagination.count = size;
                this.getProductData();
            },
            //分页器的当前页数的切换
            currentChangeHandler(index) {
                this.getProductData(index);
            },
            //查询
            searchHandler() {
                //vue深复制
                this.ajaxData = Object.assign({}, this.search);
                this.getProductData();
            },
            //弹出avatar预览上传
            beginAvatarEdit(row) {
                this.avatarDialog.id = row.id;
                if(row.avatar !== '') {
                    this.avatarDialog.fileList.push({
                        name: row.avatar.slice(row.avatar.lastIndexOf('/') + 1),
                        url: row.avatar
                    });
                }
                this.avatarDialog.isShow = true;
            },
            //弹出banner预览上传
            beginBannerEdit(row) {
                this.bannerDialog.id = row.id;
                if(row.banner) {
                    row.banner.split(',').forEach(item => {
                        this.bannerDialog.fileList.push({
                            name: item.slice(item.lastIndexOf('/') + 1),
                            url: item
                        });
                    });
                }
                this.bannerDialog.isShow = true;
            },
            //新增
            beginAdd() {
                this.editDialog.isShow = true;
                this.editDialog.mode = true;
            },
            //更新
            beginUpdate(row) {
                this.editDialog.model.id = row.id;
                this.editDialog.model.name = row.name;
                this.editDialog.model.remark = row.remark;
                this.editDialog.model.price = row.price;
                let sId = this.list.find(item => item.id === row.cid).fid;
                this.editDialog.mId = this.list.find(item => item.id === sId).fid;
                this.$nextTick(() => {
                    this.editDialog.sId = sId;
                    this.$nextTick(() => this.editDialog.model.cid = row.cid);
                });
                this.editDialog.isShow = true;
                this.editDialog.mode = false;
            },
            //avatar上传限制
            beforeAvatarUpload(file) {
                return this.$confirm('确定上传新图片替换原图片吗?', '提示', { type: 'info'})
                    .then(() => {
                        const isJPG = file.type === 'image/jpeg';
                        const isPNG = file.type === 'image/png';
                        const isLt2M = file.size / 1024 / 1024 < 2;

                        if ((!isJPG) && (!isPNG)) {
                            this.$message.error('图片必须为jpg或png类型');
                        }
                        if (!isLt2M) {
                            this.$message.error('图片必须小于2M');
                        }
                        return (isJPG || isPNG) && isLt2M ? Promise.resolve() : Promise.reject();
                    })
                    .catch(() => Promise.reject());
            },
            //avatar上传成功
            avatarUploadSuccessHandler({ status, data, message}, file, fileList) {
                if(status === 200) {
                    if(fileList.length > 1) fileList.splice(0, 1);
                    this.$message('avatar上传成功！', '提示', { type: 'success'});
                    let target = this.productList.find(item => item.id === this.avatarDialog.id);
                    target.avatar = data;
                } else this.$message(message, '提示', { type: error});
            },
            //禁止avatar删除
            avatarBeforRemove(file) {
                  if(file.url === this.avatarDialog.fileList[0].url) {
                      this.$message('avatar必须有', '提示', {type: 'warning'});
                      return false;
                  }
            },
            // banner上传限制
            beforeBannerUploadHandler(file) {
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
            //banner删除
            bannerBeforeRemoveHandler(file, fileList) {
                let filePath = file.response ? file.response.data :file.url,
                    target = this.productList.find(item => item.id === this.bannerDialog.id),
                    bannerArr = target.banner.split(','),
                    i =bannerArr.indexOf(filePath);
                bannerArr.splice(i, 1);
                let newBanner = bannerArr.length > 0 ? bannerArr.join(',') : null;
                return this.$confirm('此操作不可恢复，确定删除吗？', '警告', { type: 'warning'})
                    .then(() => {
                        return this.$http({
                            url: '/product/banner/remove',
                            data:{
                                id: this.bannerDialog.id,
                                filePath,
                                newBanner
                            }
                        });
                    })
                    .then(() => {
                        target.banner = newBanner;
                        this.$message('删除成功', '提示', { type: 'success'})
                    })
            },
            //banner上传成功
            bannerUploadSuccessHandler({status, data, message}, file, fileList) {
                if(status === 200 ) {
                    this.$message('banner上传成功', '提示', { type: 'success'});
                    let target =this.productList.find(item => item.id === this.bannerDialog.id);
                    target.banner = target.banner ? `${target.banner},${data}` :data;
                } else this.$message(message, '提示', { type: 'error' });
            },
            //商品上架
            putProductOnSale(id) {
                this.$confirm('确认上架', '提示', { type: 'warning'})
                    .then(() => {
                        this.$http({ url: `/product/putonsale/${ id }`})
                            .then(() => this.productList.find(item => item.id === id).status = 1);
                    })
                    .catch(() => {});
            },
            //商品下架
            pullProductOffShelves(id) {
                this.$confirm('请确认当前商品没有与任何未完成的订单有关系！', '提示', { type: 'warning'})
                    .then(() => {
                        this.$http({ url: `/product/pulloffselves/${ id }`})
                            .then(() => this.productList.find(item => item.id === id).status = 0);
                    })
                    .catch(() => {});
            },
            save() {
                this.$refs.form.validate()
                    .then(() => {
                        if (this.editDialog.mode) {
                            this.$http({url: '/product/add', data: this.editDialog.model})
                                .then(product => {
                                    this.productList.push(product);
                                    this.editDialog.isShow = false;
                                });
                        }
                        else {
                            this.$http({url: '/product/update', data: this.editDialog.model})
                                .then(product => {
                                    let i = this.productList.findIndex(item => item.id === this.editDialog.model.id);
                                    this.productList.splice(i, 1, product);
                                    this.editDialog.isShow = false;
                                });
                        }
                    })
                    .catch(() => {});
            },
            //重置查询
            resetSearchForm() {
                this.search.name = '';
                this.search.mId = 0;
                this.search.sId = 0;
                this.search.cId = 0;
            }
        },
        created() {
            this.init();
            this.getProductData();
        },
        watch: {
            'search.mId'() {
                this.search.sId = 0;
            },
            'search.sId'() {
                this.search.cId = 0;
            },
            'editDialog.mId'() {
                this.editDialog.sId = 0;
            },
            'editDialog.sId'() {
                this.editDialog.cid = 0;
            },
            'editDialog.isShow'(newValue) {
                if(!newValue) {
                    this.$refs.form.resetFields();
                    this.editDialog.mId = 0;
                    this.editDialog.sId = 0;
                    this.editDialog.model.cid = 0;
                    this.editDialog.model.name = '';
                    this.editDialog.model.remark = '';
                    this.editDialog.model.price = 0;
                }
            },
            'avatarDialog.isShow'(newValue) {
                if(!newValue) {
                    this.avatarDialog.id = 0;
                    this.avatarDialog.fileList = [];
                }
            },
            'bannerDialog.isShow'(newValue) {
                if(!newValue) {
                    this.bannerDialog.id = 0;
                    this.bannerDialog.fileList = [];
                }
            }
        }
    };
</script>

<style scoped>
    .form-search .el-select, .form-search .el-input {
        width: 140px
    }
</style>