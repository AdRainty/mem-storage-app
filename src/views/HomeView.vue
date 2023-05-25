<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header-class">
                <Header />
            </el-header>
            <el-container class="container-class">
                <el-aside width="200px">
                    <Aside :callback="handleRouterView"/>
                </el-aside>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from './layout/Header.vue'
import Aside from './layout/Aside.vue'

export default {
    name: 'HomeView',
    components: {
        Header,
        Aside
    },
    methods: {
        handleRouterView (view) {
            console.log(view)
            this.$router.push({ path: `/${view}` })
        }
    }
}
</script>

<style scoped>

.header-class{
    margin-top: 20px;
}

.container-class{
    margin-top: 10px;
}

</style>
