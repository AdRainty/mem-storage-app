<template>
    <div class="session">
        <div class="header">
            <span style="float: left">聊天 {{ currentSession }}</span>
            <br />
        </div>
        <el-divider />
        <div class="chat" style="height: 35vh;"></div>
        <div class="send">
            <el-divider />
            <div class="button-selector" style="float: left">
                <el-icon><Picture /></el-icon>
                <el-icon style="margin-left: 10px"><Folder /></el-icon>
            </div>
            <br /><br />
            <el-input
                v-model="message"
                :rows="6"
                type="textarea"
                resize="none"
                placeholder="Please input"
            />
            <el-button type="success" plain style="float: right; margin-top: 10px;">Send</el-button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Session',
    data () {
        return {
        }
    },
    props: {
        currentSession: { type: String }
    }
}
</script>

<style>
.red {
    height: 80px;
}
</style>
