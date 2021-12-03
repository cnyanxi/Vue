<template>
  <div>
    <!--面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodList">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table  :data="goodList"  border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"> </el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"> </el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"> </el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
             <template slot-scope="scope">
                 {{scope.row.add_time | dataFormat}}
             </template>
           </el-table-column>
        <el-table-column label="操作"  width="160px">
            <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click=""
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeGoodByID(scope.row.id)"
            ></el-button>
          </template>
             </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 分页区 -->
     
    
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有角色列表数据
      goodList: [],
       //获取用户列表的参数对象
      queryInfo: {
        query: "",
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      total:0,
      addDialogVisible:false,
      addGood:{
        goods_name:"",
        goods_price:"",
        goods_weight:"",
        add_time:""
      }
    };
  
  },
  created() {
    this.getGoodList();
  },
  methods: {
    //获取权限列表
    async getGoodList() {
      const { data: res } = await this.$http.get("goods",{
        params: this.queryInfo,});
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败!");
      }
      this.goodList = res.data.goods;
      this.total = res.data.total;
    },
      //监听 pagesize  改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodList();
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodList();
    },
     // 监听添加用户对话框的关闭事件
    addGoodClosed() {
      this.$refs.addGoodRef.resetFields();
    },
    //根据Id删除相对应的用户信息
    async removeGoodByID(id) {
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果用户取消了删除,则返回值为字符串 cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("goods/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败!");
      }
      this.$message.success("删除用户成功!");
      this.getGoodList();
    },
    goAddPage(){
         this.$router.push('/goods/add')
    },
  },
};
</script>

<style lang="less" scoped>

</style>