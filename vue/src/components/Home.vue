<template>
  <el-container style="height: 100%">
    <!-- 头部 -->
    <el-header>
      <div class="header_left">
        <img src="../assets/logo.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logingout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#406EFF"
          :unique-opened = "true"
          :collapse="isCollapes"
          :collapse-transition= "false"
          :router = "true"
          :default-active="activePath"

        >
          <!-- 一级菜单  -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域  -->
            <template slot="title">
              <!-- 图标  -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 一级菜单的模板区域文本  -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单  -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" 
            :key="subItem.id" @click="saveNaState('/' + subItem.path)"> 
              <template slot="title">
                <!-- 图标  -->
                <i class="el-icon-menu"></i>
                <!-- 一级菜单的模板区域文本  -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
            
        </el-menu>
      </el-aside>
      <el-main>
         <!--  路由占位符 -->
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  
    data(){
      return{
          menulist:[],
          iconsObj:{
            '125':'iconfont icon-user',
            '103':'iconfont icon-tijikongjian',
            '101':'iconfont icon-shangpin',
            '102':'iconfont icon-danju',
            '145':'iconfont icon-baobiao',
            },
            isCollapes:false   
      }
    },
    created(){
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
  methods: {
    logingout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
        const {data: res} = await this.$http.get('menus');
        if(res.meta.status !==200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
        console.log(res)
    },
    toggleCollapse(){
      this.isCollapes = !this.isCollapes
    },
    //保存链接的激活状态
    saveNaState(activePath){
       window.sessionStorage.setItem('activePath',activePath)
       this.activePath = activePath
    },
    
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #373d41;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
}

.el-main {
  background-color: #eaedf1;
  color: #333;
}

.header_left {
  img {
    height: 50px;
    width: 50px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.iconfont {
  margin-right:10px ;
}
.toggle-button{
 background-color: #4A5084;
 font-size: 10px;
 line-height: 24px;
 color: #fff;
 text-align: center;
 letter-spacing: 0.2em;
 cursor: pointer;
}

</style>