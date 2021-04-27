<template>
  <div class="col-md-3 boardComponent m-3">
    <div class="board-card shadow bg-light">
      <div class="card-body">
        <h5 class="card-title text-center">
          {{ board.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardComponent',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>
<style lang="scss" scoped>

.board-card{
  min-height: 8rem;
  min-width: 8rem;
  border-radius: 50px 15px;
}
</style>
