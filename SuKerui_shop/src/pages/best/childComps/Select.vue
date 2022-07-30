<template>
<div class="selectbox">
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "日常的",
        },
        {
          value: "选项2",
          label: "每周",
        },
        {
          value: "选项3",
          label: "每月一次",
        },
      ],
      value: "",
    };
  },
};
</script>
<style>
.selectbox{
  float: right;
}</style>