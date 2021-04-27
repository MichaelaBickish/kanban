<template>
  <div class="board-details-page" v-if="state.board">
    <div class="ml-4 my-4">
      <h2>
        {{ state.board.title }}
      </h2>
    </div>
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

    <ListComponent v-for="list in state.lists" :key="list.id" :list="list" />
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
export default {
  name: 'BoardDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      board: computed(() => AppState.activeBoard),
      list: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardsService.getOneBoard(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
