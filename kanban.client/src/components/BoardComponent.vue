<template>
  <div class="col-md-3 boardComponent my-3">
    <div class="board-card shadow bg-light">
      <div class="card-body">
        <div class="text-right text-danger" title="Delete This Board">
          <i class="fas fa-times action" @click="deleteBoard(board)"></i>
        </div>
        <router-link :to="{ name: 'BoardDetailsPage', params:{id:board.id} }">
          <h5 class="card-title text-center action" title="Access This Board">
            {{ board.title }}
          </h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
export default {
  name: 'BoardComponent',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteBoard() {
        try {
          if (await Notification.confirmAction()) {
            await boardsService.deleteBoard(props.board.id)
          }
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

.board-card{
  min-height: 8rem;
  min-width: 8rem;
  border-radius: 50px 15px;
}
.action{
  cursor: pointer;
  z-index: 10;
}
</style>
