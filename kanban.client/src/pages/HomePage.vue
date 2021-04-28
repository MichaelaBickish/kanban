<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <i class="fas fa-hand-sparkles fa-6x"></i>
    <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">You must be logged in to access boards</span>
    </h1>
    <!-- insert vid tag here -->
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
