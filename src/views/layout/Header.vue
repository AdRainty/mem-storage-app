<template>
    <div class="layout-header" style="boxShadow: --el-box-shadow;">
        <div>
            <img class="logo" alt="logo" src="@/assets/cover.png">
        </div>
        <div class="block">
            <el-avatar :size="50" :src="avatarUrl" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'Header',
    components: {
    },
    data () {
        return {
            avatarUrl: ''
        }
    },
    methods: {
    }
}
</script>

<style scoped>

.block {
    position: absolute;
    right: 5%;
}

.logo {
    height: 60px;
    position: absolute;
    left: 0%;
}

</style>
