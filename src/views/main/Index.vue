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
                    >
                        <el-icon class="el-icon--left"><FolderAdd /></el-icon
                        >Add Floder
                    </el-button>
                    <el-input
                        v-model="keyword"
                        style="width: 20%; position: absolute; right: 0%"
                        placeholder="Please Input"
                        :suffix-icon="Search"
                    />
                </el-row>
            </div>
        </div>
        <div class="nav">
            <el-space
                spacer="|"
                style="position: absolute; left: 240px; margin-top: 10px"
            >
                <div>
                    <el-icon><Back /></el-icon>
                    <el-icon style="margin-left: 10px"><Right /></el-icon>
                </div>
                <div>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item>home</el-breadcrumb-item>
                        <el-breadcrumb-item>index</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-space>
        </div>
        <div style="margin-top: 50px;">
            <el-table
                :data="fileList"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"/>
                <el-table-column property="name" label="文件名"/>
                <el-table-column label="时间">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="type" label="类型" />
                <el-table-column property="size" label="大小" />
                <el-table-column property="operations" label="操作" >
                    <template #default>
                        <el-icon style="margin-left: 10px;"><Share /></el-icon>
                        <el-icon style="margin-left: 10px;"><Download /></el-icon>
                        <el-icon style="margin-left: 10px;"><Delete /></el-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { Search, ArrowRight } from '@element-plus/icons-vue'
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
            ]
        }
    },
    methods: {
        handleUpload (options) {
            console.log(options)
        },
        handleSelectionChange (val) {
            console.log(val)
        }
    }
}
</script>
