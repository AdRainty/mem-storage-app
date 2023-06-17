<template>
    <div class="session">
        <div class="header">
            <span style="float: left">聊天 {{ currentSession }}</span>
            <br />
        </div>
        <el-divider />
        <div class="chat" style="height: 40vh; overflow-y: auto; overflow-x: hidden;">
            <div v-for="item in messageData" :key="item">
                <div style="margin-top:35px">
                    <MessageBox :message="item"></MessageBox>
                </div>
            </div>
        </div>
        <div class="send">
            <el-divider />
            <div class="button-selector" style="float: left">
                <el-row>
                    <el-col :span="12">
                        <el-popover placement="right" :width="0" trigger="click">
                            <template #reference>
                                <el-button :icon="Picture" circle />
                            </template>
                            <Picker :data="emojiIndex" set="twitter" @select="showEmoji" />
                        </el-popover>
                    </el-col>
                    <el-col :span="12">
                        <el-button :icon="Folder" style="margin-left: 10px" circle @click="() => showFileSelect = true" />
                    </el-col>
                </el-row>
            </div>
            <el-input class="messageInput" v-model="message" :rows="6" style="margin-top: 10px" type="textarea"
                resize="none" placeholder="Please input" @keyup.ctrl.enter.exact="handleKeyUp($event)"
                @keyup.enter.exact="handleKeyUp($event, 'enter')" />
            <el-button type="success" plain style="float: right; margin-top: 10px;" @click="sendMessage">Send</el-button>
        </div>
        <FileSelect :dialogFormVisible="showFileSelect" :callback="handleFileSelect" />
    </div>
</template>

<script>
import { getCurrentInstance, shallowRef } from 'vue'
import store from '@/store'
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import { Picture, Folder } from '@element-plus/icons-vue'
import { nanoid } from 'nanoid'
import { ElMessage } from 'element-plus'
import MessageBox from './MessageBox.vue'
import FileSelect from './FileSelect.vue'

export default {
    name: 'Session',
    data() {
        return {
            message: '',
            emojiIndex: new EmojiIndex(data),
            messageData: [],
            Picture: shallowRef(Picture),
            Folder: shallowRef(Folder),
            oldScrollTop: 0,
            scrollFlag: true,
            Intervall: null,
            showFileSelect: false
        }
    },
    components: {
        Picker,
        MessageBox,
        FileSelect
    },
    props: {
        currentSession: { type: String },
        chatType: { type: Number }
    },
    setup() {
        const { proxy } = getCurrentInstance()

        return {
            proxy
        }
    },
    mounted() {
        document.querySelector('.chat').addEventListener('scroll', this.scrolling)
        this.scrollToBottom()
        console.log(this.currentSession)
        this.proxy.$get(`/api/im/message/history?id=${this.currentSession}&chatType=${this.chatType}`).then(r => {
            console.log(r)
            this.messageData = r.talk
            if (this.scrollFlag) {
                this.scrollToBottom()
            }
        }).catch(e => {
            console.log(e)
        })
    },
    created() {
        const that = this
        store.state.socket.onmessage = function (event) {
            const message = JSON.parse(event.data)
            if (message.sender === that.currentSession) {
                that.pushData(JSON.parse(event.data))
                if (that.scrollFlag) {
                    that.scrollToBottom()
                }
            }
        }
    },
    beforeRouteLeave() {
        document.querySelector('.chat').removeEventListener('scroll', this.scrolling)
    },
    methods: {
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$el.querySelector('.chat')
                container.scrollTop = container.scrollHeight
            })
        },
        handleFileSelect(file) {
            this.showFileSelect = false
            if (file === undefined) {
                console.log('undefined')
            } else {
                console.log(file)
                const socket = store.state.socket
                for (let i = 0; i < file.length; i++) {
                    const message = {
                        id: nanoid(),
                        sender: store.state.user.id,
                        receiver: this.currentSession,
                        chatType: this.chatType,
                        msgType: 2,
                        message: file[i].id,
                        isRead: 0
                    }
                    this.messageData.push(message)
                    if (this.scrollFlag) {
                        this.scrollToBottom()
                    }
                    socket.send(JSON.stringify(message))
                }
            }
        },
        pushData(data) {
            this.messageData.push(data)
        },
        scrolling() {
            const scrollTop = document.querySelector('.chat').scrollTop
            const scrollStep = scrollTop - this.oldScrollTop
            this.oldScrollTop = scrollTop
            if (scrollStep < 0) {
                this.scrollFlag = false
            } else {
                this.scrollFlag = true
            }
        },
        handleKeyUp(e) {
            if (e.ctrlKey && e.keyCode === 13) {
                this.sendMessage()
            }
        },
        sendMessage() {
            if (this.message === '') {
                ElMessage('消息不能为空')
            } else {
                const socket = store.state.socket
                console.log(this.message)
                const message = {
                    id: nanoid(),
                    sender: store.state.user.id,
                    receiver: this.currentSession,
                    chatType: this.chatType,
                    msgType: 0,
                    message: this.message,
                    isRead: 0
                }
                this.messageData.push(message)
                if (this.scrollFlag) {
                    this.scrollToBottom()
                }
                socket.send(JSON.stringify(message))
                this.message = ''
            }
        },
        showEmoji(emoji) {
            this.message = this.message + emoji.native
        }
    }
}
</script>

<style>
.red {
    height: 80px;
}
</style>
