<template>
  <div class="col-md-3 list shadow m-3 bg-light">
    <div class="row h-100">
      <!-- v-if="list.title" -->
      <div class="col-md-12">
        <div>
          <b class="list-title ">
            {{ list.title }}
          </b>
        </div>
        <div class="float-right text-danger">
          <label for="delete this list" class="list-delete mt-3 mr-2">
            <i class="fas fa-times" @click="deleteList(list)"></i>
          </label>
        </div>
      </div>
      <!-- Injecting Task component here -->
      <div>
        <TaskComponent v-for="task in state.tasks" :key="task.id" :task="task" />
      </div>
      <!-- inputform below -->
      <div class="col-md-12 align-self-end mb-2">
        <!-- v-if="state.tasks" -->

        <form class="form-inline" @submit.prevent="createTask">
          <div class="form-group mx-sm-3 mb-2">
            <input type="text"
                   class="form-control"
                   id="task-title"
                   placeholder="Add a Task..."
                   v-model="state.newTask.title"
                   required
            >
            <button type="submit" class="btn btn-outline-primary mb-2 ml-1 mt-2">
              +
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- input form above -->
  </div>
</template>

<script>
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import { computed, onMounted, reactive } from 'vue'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
export default {
  name: 'ListComponent',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newTask: {},
      tasks: computed(() => AppState.tasks[props.list.id])
    })
    onMounted(async() => {
      try {
        await listsService.getTaskByListId(props.list.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async deleteList() {
        try {
          if (await Notification.confirmAction()) {
            await listsService.deleteList(props.list.id)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createTask() {
        try {
          state.newTask.listId = props.list.id
          await tasksService.createTask(state.newTask)
          Notification.toast('Successfully Created Task!', 'success')
          state.newTask = {}
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
.list{
  min-width: 15rem;
  min-height: 45rem;
  border-radius: 50px 50px 50px 50px;
}
.list-title{
position: absolute;
margin-top: 1rem;
}
input{
  max-width: 50%
}
</style>
