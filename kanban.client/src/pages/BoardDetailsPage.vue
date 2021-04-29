<template>
  <div class="board-details-page container-fluid" v-if="state.board">
    <div class="row">
      <div class="col-md-12 ml-4 my-4">
        <h2>
          {{ state.board.title }}
        </h2>
        <div v-if="state.lists">
          <span class="ml-4"><label for="title" class="">Create a New List! </label></span>
          <form class="form-inline" @submit.prevent="createList">
            <div class="form-group mx-sm-3 mb-2">
              <input type="text"
                     class="form-control"
                     id="list-title"
                     placeholder="List Title..."
                     v-model="state.newList.title"
                     required
              >
            </div>
            <button type="submit" title="Add a List" class="btn btn-outline-primary action mb-2">
              +
            </button>
          </form>
        </div>
      </div>

      <ListComponent v-for="list in state.lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
import { listsService } from '../services/ListsService'
export default {
  name: 'BoardDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: {},
      board: computed(() => AppState.activeBoard),
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardsService.getOneBoard(route.params.id)
        await boardsService.getListByBoardId(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      route,
      async createList() {
        try {
          // this line below is telling the computer to add the boardId (route.params.id) to the body of the list we are creating
          state.newList.boardId = route.params.id
          await listsService.createList(state.newList)
          Notification.toast('Successfully Created Board!', 'success')
          state.newList = {}
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
.action{
  cursor: pointer;
  z-index: 10;
}
</style>
