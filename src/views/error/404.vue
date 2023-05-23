<template>
    <el-empty description="404 Not Found" :image-size="400" >
        <el-button type="primary" @click="handleClick">Back To Home</el-button>
    </el-empty>
</template>

<script>

export default {
    name: '404',
    methods: {
        handleClick () {
            this.$router.push('/home')
        }
    }
}
</script>
