<template>
    <div class="message-box">
        <div v-if="userId === message.sender">
            <el-row :gutter="24">
                <el-col :span="20">
                    <span style="position:absolute; right:15%; align: right; max-width: 20%; " v-if="message.msgType === 0">
                        <pre>{{ message.message }}</pre>
                    </span>
                    <div v-if="message.msgType === 2">
                        <el-card class="box-card" style="width: 15%; right:15%; position:absolute;">
                            <el-row :gutter="24">
                                <el-col :span="8">
                                    <component :is="type['icon']" style="width: 80%; height: auto;" />
                                </el-col>
                                <el-col :span="15">
                                    <span style="position:absolute; left: 30%; align: left; max-width: 20%; ">
                                        <pre>{{ file.name }}</pre>
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="8">
                                    <el-link type="primary" @click="handleDownload">下载</el-link>
                                </el-col>
                                <el-col :span="15">
                                    <el-link type="primary" @click="handleSave">保存</el-link>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-avatar src="" />
                </el-col>
            </el-row>
        </div>
        <div v-if="userId !== message.sender">
            <el-row :gutter="24">
                <el-col :span="2">
                    <el-avatar src="" />
                </el-col>
                <el-col :span="6">
                    <div v-if="message.msgType === 2">
                        <el-card class="box-card" style="width: 15%; right:15%; position:absolute;" @onclick="saveItem">
                            <el-row :gutter="24">
                                <el-col :span="8">
                                    <component :is="type['icon']" style="width: 80%; height: auto;" />
                                </el-col>
                                <el-col :span="15">
                                    <span style="position:absolute; left: 30%; align: left; max-width: 20%; ">
                                        <pre>{{ file.name }}</pre>
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="8">
                                    <el-link type="primary" @click="handleDownload">下载</el-link>
                                </el-col>
                                <el-col :span="15">
                                    <el-link type="primary" @click="handleSave">保存</el-link>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                    <span style="position:absolute; left:8%; align: left; max-width: 20%; " v-if="message.msgType === 0">
                        <pre>{{ message.message }}</pre>
                    </span>
                </el-col>
            </el-row>
        </div>
        <MenuSelect :dialogFormVisible="showMenuSelect" :callback="handleMenuSelect" />
    </div>
</template>

<script>
import store from '../../../store'
import { getCurrentInstance } from 'vue'
import MenuSelect from './MenuSelect.vue'
import { ElMessage } from 'element-plus'

export default {
    components: { MenuSelect },
    name: 'MessageBox',
    data() {
        return {
            userId: store.state.user.id,
            file: {},
            type: {},
            showMenuSelect: false
        }
    },
    props: {
        message: { type: Object }
    },
    created() {
        if (this.message.msgType === 2) {
            this.proxy.$get(`/api/file/get?id=${this.message.message}`).then(r => {
                this.file = r.file
                this.type = this.fileType[this.file.type]
            }).catch(e => {
                console.log(e)
            })
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
            9: { name: '其他', icon: 'Files' }
        }

        return {
            proxy, fileType
        }
    },
    methods: {
        handleDownload() {
            window.location.href = `http://localhost:9500/api/file/download?fileId=${this.file.id}`
        },
        handleSave() {
            this.showMenuSelect = true
        },
        handleMenuSelect(path) {
            if (path !== undefined) {
                this.proxy.$post('/api/file/save', { fileId: this.file.id, path: path }).then(r => {
                    if (r.code === 0) {
                        ElMessage.success('保存成功')
                    } else {
                        ElMessage.error('保存失败')
                    }
                })
            }
            this.showMenuSelect = false
        }
    }
}
</script>
