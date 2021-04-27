<template>
  <div class="boards-page" v-if="state.boards">
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
    <!-- {{ state.boards }} -->
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'

import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'BoardsPage',
  setup() {
    const state = reactive({
      newBoard: {},
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getMyBoards()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
          Notification.toast('Successfully Created Board!', 'success')
          state.newBoard = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
