<template>
  <div class="global">
    <div class="free">
      <img src="https://volunteer.cdn-go.cn/404/latest/img/freelunch1600.jpg" alt />
    </div>
    <div class="code">
      <p>❤️</p>
      <img src="https://volunteer.cdn-go.cn/404/latest/img/freeLungchQR.png" alt />
    </div>
    <div class="detail">
      <h1>404</h1>
      <h2>您访问的页面已饿晕在路上</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.global {
  width: 1360px;
  border: 20px solid tomato;
  margin: 10px auto;
  position: relative;
  .free {
    width: 900px;
    margin: 10px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .code {
    width: 300px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    img {
      width: 80%;
      height: 80%;
    }
  }
  .detail {
    width: 300px;
    position: absolute;
    bottom: 5px;
    left: 5px;
    h1 {
      color: deepskyblue;
      font-size: 100px;
      font-weight: 900;
      font-style: italic;
    }
    h2 {
      color: deepskyblue;
      font-size: 40px;
      font-weight: 900;
      font-style: italic;
    }
  }
}
</style>