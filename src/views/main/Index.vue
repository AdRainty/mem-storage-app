<template>
    <div class="index">
        <div class="button-view">
            <div>
                <el-row class="mb-4">
                    <el-button type="primary" round @click="dialogVisible = true">
                        <el-icon class="el-icon--left">
                            <UploadFilled />
                        </el-icon>上传
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="拖动或选择上传" width="30%">
                        <el-upload ref="upload" :v-model="uploadFiles" drag action="" :auto-upload="false"
                            :http-request="httpRequest" multiple>
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                Drop file here or <em>click to upload</em>
                            </div>
                        </el-upload>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogVisible = false">取消</el-button>
                                <el-button type="primary" @click="submitUpload">
                                    上传
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                    <el-button type="primary" round plain style="margin-left: 10px" @click="handleAddFloder">
                        <el-icon class="el-icon--left">
                            <FolderAdd />
                        </el-icon>新建文件夹
                    </el-button>
                    <div>
                        <el-button type="danger" round :disabled="!isSelect" style="margin-left: 10px">
                            <el-icon class="el-icon--left">
                                <FolderAdd />
                            </el-icon>批量删除
                        </el-button>
                        <el-button type="primary" round :disabled="!isSelect" style="margin-left: 10px">
                            <el-icon class="el-icon--left">
                                <FolderAdd />
                            </el-icon>分享所选文件
                        </el-button>
                        <span style="margin-left: 10px"> 共 {{ fileList.length }} 项 </span>
                        <span style="margin-left: 10px"> 已选择 {{ selector.length }} 个文件 </span>
                    </div>
                    <el-input v-model="keyword" style="width: 20%; position: absolute; right: 0%" placeholder="Please Input"
                        :suffix-icon="Search" />
                </el-row>
            </div>
        </div>
        <div class="nav" style="margin-top: 10px">
            <el-space spacer="|" style="float: left; margin-top: 10px">
                <div>
                    <el-button-group class="ml-4">
                        <el-button type="primary" text :icon="Back" :disabled="pathsCur + 1 <= 1" />
                        <el-button type="primary" text :icon="Right" :disabled="pathsCur + 1 === paths.length" />
                    </el-button-group>
                </div>
                <div>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item v-for="path in getCurList(paths[pathsCur])" :key="path">
                            <el-link @click="handleFolderGo(path)">
                                {{ path.substring(path.lastIndexOf('/') + 1) }}
                            </el-link>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-space>
        </div>
        <div style="margin-top: 50px">
            <el-table :data="fileList" style="width: 100%" @selection-change="handleSelectionChange"
                @sort-change="handleSort">
                <el-table-column type="selection" />
                <el-table-column property="name" label="文件名" sortable="custom">
                    <template #default="scope">
                        <div v-if="scope.row.type !== 0">
                            <el-icon>
                                <component :is="getFileType(scope.row.type)['icon']" />
                            </el-icon>
                            {{ scope.row.name }}
                        </div>
                        <div v-if="scope.row.type === 0">
                            <el-link @click="selectFolder(scope.row)">
                                <el-icon>
                                    <component :is="getFileType(scope.row.type)['icon']" />
                                </el-icon>
                                {{ scope.row.name }}
                            </el-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="updateTime" label="时间" sortable="custom">
                    <template #default="scope">{{ scope.row.updateTime }}</template>
                </el-table-column>
                <el-table-column property="type" label="类型" sortable="custom">
                    <template #default="scope">{{ getFileType(scope.row.type)['name'] }}</template>
                </el-table-column>
                <el-table-column property="size" label="大小" sortable="custom" />
                <el-table-column property="operations" label="操作">
                    <template #default>
                        <el-button-group class="ml-4">
                            <el-button type="primary" :icon="Share" />
                            <el-button type="primary" :icon="Download" />
                            <el-button type="primary" :icon="Delete" />
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { Search, ArrowRight, Share, Download, Delete, Back, Right } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentInstance, shallowRef } from 'vue'

export default {
    name: 'Index',
    components: {
    },
    data() {
        return {
            keyword: '',
            Search: shallowRef(Search),
            ArrowRight: shallowRef(ArrowRight),
            Share: shallowRef(Share),
            Download: shallowRef(Download),
            Delete: shallowRef(Delete),
            Back: shallowRef(Back),
            Right: shallowRef(Right),
            fileList: [],
            uploadFiles: [],
            isSelect: false,
            selector: [],
            paths: ['/我的网盘'],
            pathsCur: 0,
            dialogVisible: false
        }
    },
    setup() {
        const { proxy } = getCurrentInstance()

        const fileType = {
            0: { name: '文件夹', icon: 'Folder' },
            1: { name: '文档', icon: 'Document' },
            2: { name: '视频', icon: 'Film' },
            3: { name: '音频', icon: 'Headset' },
            4: { name: '压缩包', icon: 'Collection' },
            5: { name: '图片', icon: 'Picture' },
            6: { name: '其他', icon: 'Files' }
        }

        return {
            proxy, fileType
        }
    },
    beforeMount() {
        this.listFiles()
    },
    methods: {
        httpRequest (options) {
            console.log(options.file)
            const file = options.file
            const files = []
            files.push(file)
            this.proxy.$post(`/api/file/upload?path=${this.paths[this.pathsCur]}`, {
                files
            }).then(r => {
                console.log(r)
                this.fileList = r.list
            }).catch(e => {
                console.log(e)
                ElMessage.error('Network Error.')
            })
        },
        submitUpload () {
            this.$refs.upload.submit()
            // console.log(this.$refs.upload)
            // console.log(this.uploadFiles)
        },
        handleSelectionChange(val) {
            this.selector = val
            this.isSelect = this.selector.length > 0
        },
        handleAddFloder() {
            ElMessageBox.prompt('请输入文件夹名称', '提示', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel'
            }).then(({ value }) => {
                console.log(value)
                const path = this.paths.join('')
                this.proxy.$get('/api/file/newFolder', { folderName: value, path }).then(r => {
                    console.log(r)
                    if (r.code === 0) {
                        ElMessage({
                            type: 'success',
                            message: '添加文件夹成功'
                        })
                        this.listFiles()
                    }
                }).catch(e => {
                    console.log(e)
                    ElMessage.error('Network Error.')
                })
            }).catch(() => {
                console.log('user cancle')
            })
        },
        listFiles() {
            const path = this.paths[this.pathsCur]
            console.log('request', path)
            this.proxy.$get('/api/file/list', { path }).then(r => {
                console.log(r)
                this.fileList = r.list
            }).catch(e => {
                console.log(e)
                ElMessage.error('Network Error.')
            })
        },
        getFileType(code) {
            return this.fileType[code]
        },
        selectFolder(row) {
            const selected = row.name
            this.paths.push(this.paths[this.pathsCur] + '/' + selected)
            this.pathsCur += 1
            this.listFiles()
        },
        handleFolderGo(path) {
            this.paths.push(path)
            this.pathsCur += 1
            this.listFiles()
        },
        getCurList(path) {
            console.log('path', path)
            path = path.substring(1)
            const ds = path.split('/')
            console.log(ds)
            const ret = []
            let pre = ''
            for (let i = 0; i < ds.length; i++) {
                pre += '/' + ds[i]
                ret.push(pre)
            }
            console.log(ret)
            return ret
        },
        handleSort(name, order) {
            console.log(name, order)
        }
    }
}
</script>
