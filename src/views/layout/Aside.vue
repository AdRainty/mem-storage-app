<template>
    <div class="aside-layout">
        <el-menu
            default-active="index"
            class="el-menu-vertical-demo"
            @select="handleOpen"
        >
            <el-menu-item index="index">
                <el-icon><House /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="message">
                <el-icon><ChatLineSquare /></el-icon>
                <span>消息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { House } from '@element-plus/icons-vue'

export default {
    name: 'Aside',
    components: {
    },
    data () {
        return {
            House
        }
    },
    props: {
        callback: { type: Function }
    },
    methods: {
        handleOpen (key, _) {
            this.callback(key)
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo{
    height: 100%;
}

</style>
