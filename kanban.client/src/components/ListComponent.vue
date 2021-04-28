<template>
  <div class="col-md-3 list shadow m-3 bg-light">
    <!-- v-if="list.title" -->
    <b class="list-title mx-3 ">
      {{ list.title }}
    </b>

    <!-- inputform below -->
    <!-- <div class="boards-page" v-if="state.boards">
        <span class="ml-4"><label for="title" class="">Create a New Board! </label></span>
        <form class="form-inline" @submit.prevent="createBoard">
          <div class="form-group mx-sm-3 mb-2">
            <input type="text"
                   class="form-control"
                   id="board-title"
                   placeholder="Board Title..."
                   v-model="state.newBoard.title"
                   required
            >
          </div>
          <button type="submit" class="btn btn-primary mb-2">
            +
          </button>
        </form>
      </div> -->
    <!-- input form above -->
  </div>
</template>

<script>
export default {
  name: 'ListComponent',
  props: {
    list: {
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
.list{
  min-width: 15rem;
  min-height: 45rem;
  border-radius: 50px 50px 50px 50px;
}
.list-title{
position: absolute;
margin-top: 1rem;
}
</style>
