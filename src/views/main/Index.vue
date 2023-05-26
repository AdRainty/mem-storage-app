<template>
    <div class="index">
        <div class="button-view">
            <div>
                <el-row class="mb-4">
                    <el-upload
                        class="upload-demo"
                        action=""
                        :show-file-list="false"
                        :http-request="handleUpload"
                    >
                        <el-button type="primary" round>
                            <el-icon class="el-icon--left"
                                ><UploadFilled /></el-icon
                            >Upload
                        </el-button>
                    </el-upload>
                    <el-button
                        type="primary"
                        round
                        plain
                        style="margin-left: 10px"
                        @click="handleAddFloder"
                    >
                        <el-icon class="el-icon--left"><FolderAdd /></el-icon
                        >Add Floder
                    </el-button>
                    <div>
                        <el-button
                            type="danger"
                            round
                            :disabled="!isSelect"
                            style="margin-left: 10px"
                        >
                            <el-icon class="el-icon--left"
                                ><FolderAdd /></el-icon
                            >批量删除
                        </el-button>
                        <el-button
                            type="primary"
                            round
                            :disabled="!isSelect"
                            style="margin-left: 10px"
                        >
                            <el-icon class="el-icon--left"
                                ><FolderAdd /></el-icon
                            >分享所选文件
                        </el-button>
                        <el-button
                            type="primary"
                            round
                            :disabled="!isSelect"
                            style="margin-left: 10px"
                        >
                            <el-icon class="el-icon--left"
                                ><FolderAdd /></el-icon
                            >下载所选文件
                        </el-button>
                        <span> 已选择 {{ selector.length }} 个文件 </span>
                    </div>
                    <el-input
                        v-model="keyword"
                        style="width: 20%; position: absolute; right: 0%"
                        placeholder="Please Input"
                        :suffix-icon="Search"
                    />
                </el-row>
            </div>
        </div>
        <div class="nav" style="margin-top: 10px">
            <el-space
                spacer="|"
                style="float: left; margin-top: 10px"
            >
                <div>
                    <el-button-group class="ml-4">
                        <el-button type="primary" text :icon="Back" :disabled="historyIndex + 1" />
                        <el-button type="primary" text :icon="Right" />
                    </el-button-group>
                </div>
                <div>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-space>
        </div>
        <div style="margin-top: 50px">
            <el-table
                :data="fileList"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" />
                <el-table-column property="name" label="文件名" />
                <el-table-column label="时间">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="type" label="类型" />
                <el-table-column property="size" label="大小" />
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
import { shallowRef } from 'vue'

export default {
    name: 'Index',
    components: {
    },
    data () {
        return {
            keyword: '',
            Search: shallowRef(Search),
            ArrowRight: shallowRef(ArrowRight),
            Share: shallowRef(Share),
            Download: shallowRef(Download),
            Delete: shallowRef(Delete),
            Back: shallowRef(Back),
            Right: shallowRef(Right),
            fileList: [
                { name: 'name1', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name2', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name3', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name4', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name5', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name6', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name7', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name8', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name9', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name10', type: '文件夹', date: '2023-05-25', size: '255kb' },
                { name: 'name11', type: '文件夹', date: '2023-05-25', size: '255kb' }
            ],
            isSelect: false,
            selector: [],
            history: ['首页'],
            historyIndex: 0
        }
    },
    methods: {
        handleUpload (options) {
            console.log(options)
        },
        handleSelectionChange (val) {
            this.selector = val
            this.isSelect = this.selector.length > 0
        },
        handleAddFloder () {
            ElMessageBox.prompt('请输入文件夹名称', '提示', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel'
            }).then(({ value }) => {
                console.log(value)
                ElMessage({
                    type: 'success',
                    message: '添加文件夹成功'
                })
            }).catch(() => {
                console.log('user cancle')
            })
        }
    }
}
</script>
