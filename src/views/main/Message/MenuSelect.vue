<template>
    <el-dialog title="选择文件夹" v-model="show">
        <template #footer>
            <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange" check-strictly />
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleSelect">
                    选择
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import store from '../../../store'

export default {
    name: 'MenuSelect',
    data() {
        return {
            show: false,
            props: { label: 'name' },
            checked: []
        }
    },
    watch: {
        dialogFormVisible() {
            console.log(this.dialogFormVisible)
            this.show = this.dialogFormVisible
        }
    },
    props: {
        dialogFormVisible: { type: Boolean },
        callback: { type: Function }
    },
    created() {
        console.log(this.dialogFormVisible)
    },
    setup() {
        const { proxy } = getCurrentInstance()

        return {
            proxy
        }
    },
    methods: {
        handleClose() {
            console.log('close')
            this.callback()
        },
        handleSelect() {
            if (this.checked.length === 0) {
                ElMessage.error('请选择文件夹')
            } else {
                for (let i = 0; i < this.checked.length; i++) {
                    const node = this.checked[i]
                    let newName = node.path.replace(store.state.user.username, '/我的网盘')
                    if (newName[newName.length - 1] !== '/') {
                        newName += '/' + node.name
                    } else {
                        newName += node.name
                    }
                    console.log(newName)
                    this.callback(newName)
                }
            }
        },
        loadNode(node, resolve) {
            this.proxy.$get(`/api/file/list?name=&updateTime=&size=&path=${this.getNodePath(node)}`).then(r => {
                const files = r.list.filter(item => {
                    return item.type === 0
                })
                return resolve(files)
            })
        },
        handleCheckChange(data, checked, indeterminate) {
            if (!indeterminate && checked) {
                this.checked.push(data)
            } else if (!checked) {
                const index = this.checked.findIndex(item => item === data)
                this.checked.splice(index, 1)
            }
            console.log(this.checked)
        },
        getNodePath(node) {
            console.log(node)
            let name = '/我的网盘'
            if (node.level === 0) return name
            let level = node.level
            const stack = []
            while (level > 0) {
                console.log('push', node.data.name)
                stack.push(node.data.name)
                node = node.parent
                level -= 1
            }
            console.log(stack)
            for (let i = stack.length - 1; i >= 0; i--) {
                console.log(stack[i])
                name += '/' + stack[i]
            }
            return name
        }
    }
}
</script>

<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
