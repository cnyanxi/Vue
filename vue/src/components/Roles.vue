<template>
  <div>
    <!--面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogRole = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">
                  {{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >
                      {{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3, i3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditRole(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRole(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加权限角色 -->
    <el-dialog
      title="添加权限角色"
      :visible.sync="addDialogRole"
      width="50%"
      @close="closedRoleDialog"
    >
      <el-form :model="addRole" ref="addRoleRef" label-width="70px">
        <el-form-item label="用户名称" prop="roleName">
          <el-input v-model="addRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加权限角色 -->
    <!-- 修改权限角色信息的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogRole"
      width="50%"
      @close="closedRoleEdit"
    >
      <el-form :model="editRole" ref="editRoleRef" label-width="70px">
        <el-form-item label="用户名称" prop="email">
          <el-input v-model="editRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="用户描述" prop="mobile">
          <el-input v-model="editRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogRole = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改权限角色信息的对话框 -->

    <!-- 分配权限角色信息的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed"
    >
       <!-- 树形控件 -->
       <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all=""
        :default-checked-keys="defKeys"  ref="treeRef"
       >

       </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 分配权限角色信息的对话框 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      //控制添加用户权限对话框的显示与隐藏
      addDialogRole: false,
      //添加用户权限的表单数据
      addRole: {
        roleName: "",
        roleDesc: "",
      },
      editRole: {},
      editDialogRole: false,
      //展示分配权限的对话框
      setRightDialogVisible:false,

      rightslist:[],
      treeProps:{
        label:'authName',
        children:'children'
      },
      defKeys:[],
      roleId:''
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败!");
      }
      this.rolesList = res.data;
      console.log(res.data);
    },
    closedRoleDialog() {
      this.$refs.addRoleRef.resetFields();
    },
    addRoles() {
      this.$refs.addRoleRef.validate(async (valid) => {
        if (!valid) return;
        //可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("roles", this.addRole);
        if (res.meta.status !== 201) {
          this.$message.error("添加角色失败！");
        }
        this.$message.success("添加角色成功！");
        this.addDialogRole = false;
        //重新获取用户的列表
        this.getRolesList();
      });
    },
    async showEditRole(id) {
      const { data: res } = await this.$http.get("roles/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
      this.editRole = res.data;
      this.editDialogRole = true;
    },
    closedRoleEdit() {
      this.$refs.editRoleRef.resetFields();
    },
    editRoles() {
      this.$refs.editRoleRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          "roles/" + this.editRole.roleId,
          {
            roleName: this.editRole.roleName,
            roleDesc: this.editRole.roleDesc,
          }
        );
        console.log(this.editRole);
        if (res.meta.status !== 200) {
          this.$message.error("更新用户信息失败！");
        }
        this.$message.success("更新用户信息成功！");
        this.editDialogRole = false;
        //重新获取用户的列表
        this.getRolesList();
      });
    },
    async deleteRole(id) {
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
      const { data: res } = await this.$http.delete("roles/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败!");
      }
      this.$message.success("删除用户成功!");
      this.getRolesList();
    },
    //根据id删除对应的权限
    async removeRightById(role, rightId) {
      //弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      
      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除!");
      }
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );

      if (res.meta.status !== 200) {
        return this.$message.error("删除权限失败!");
      }
      role.children = res.data;
    },
    //展示分配权限的对话框
   async showSetRightDialog(role) {
     this.roleId = role.id
      //获取所有权限的数据
      const {data:res} = await this.$http.get('rights/tree')
      if(res.meta.status !== 200){
        return this.$message.error('获取权限数据失败！')
      }
      this.rightslist = res.data
      //递归获取三级节点的Id
      this.getLeafKeys(role,
      this.defKeys)
      this.setRightDialogVisible = true      
    },
    //通过递归的形式,获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node,arr){
      //如果当前 node 节点不包含children属性，则是三级节点
          if(!node.children){
             return arr.push(node.id)
          }
          node.children.forEach(item =>
          this.getLeafKeys(item,arr))
    },
    setRightDialogClosed(){
      this.defKeys = []
    },
    //点击为角色分配权限
    async allotRights(){
      const keys = [
        this.$refs.treeRef.getCheckedKeys(),
        this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      const idStr = keys.join(',')
      console.log(idStr);
     const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
     
     if(res.meta.status !==200){
       return this.$message.error('分配权限失败!')
     }
     this.$message.success('分配权限成功!')
     this.getRolesList()
     this.setRightDialogVisible = false
    }
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
