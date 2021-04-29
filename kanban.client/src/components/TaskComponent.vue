<template>
  <div class="task-component shadow rounded mx-3 ">
    <!-- this is injected into the list component -->

    <div class="card my-1">
      <div class="card-body">
        <div class="text-right">
          <i class="fas fa-times text-danger action" title="delete task" @click="deleteTask(task)"></i>
        </div>
        <p>
          {{ task.title }}
        </p>
        <!-- This starts the move task dropdown -->
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle my-2"
                  type="button"
                  title="Move task to a different board!"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            <span class="text-dark">
              Move Task
            </span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <a class="dropdown-item action"
               type="button"
               title="Move to this board!"
               v-for="list in state.list"
               :key="list.id"
               @click="moveTask(task, list.id)"
            >
              <p>
                {{ list.title }}
              </p>
            </a>
          </div>
        </div>
        <!-- this ends the move task dropdown -->
        <!-- btn -->
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle my-2"
                  type="button"
                  title="View/Add comment"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            <span class="text-dark">
              Comment
            </span>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <!-- start the add comment input -->
            <form action="" @submit.prevent="createComment">
              <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Add Comment..."
                       aria-describedby="basic-addon2"
                       v-model="state.newComment.body"
                       required
                >
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary action" title="Add Comment" type="submit">
                    <i class="fa fa-plus font-weight-bold" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </form>
            <!-- end -->

            <ul class="dropdown-item">
              <CommentComponent v-for="comment in task.comments" :key="comment.id" :comment="comment" :task="task" />
              <!-- :comment="comment" & :task="task" is passing through prop comment from commentComponent & the prop from here -->
            </ul>
          </div>
        </div>
      <!-- btn -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
export default {
  name: 'TaskComponent',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newComment: {},
      list: computed(() => AppState.lists)
    })
    return {
      state,
      async deleteTask() {
        try {
          if (await Notification.confirmAction()) {
            await tasksService.deleteTask(props.task)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createComment() {
        try {
          // these are saving the taskId and the list = to Id onto the comment before we send the object stae.newComment over to service. We access the newComment using the term body in service
          state.newComment.taskId = props.task.id
          state.newComment.listId = props.task.listId
          await tasksService.createComment(state.newComment)
          Notification.toast('Successfully Created Task!', 'success')
          state.newComment = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      // TODO add the method that we send to tasksService to edit the task
      async moveTask(task, listId) {
        try {
          await tasksService.moveTask(task, listId)
          Notification.toast('Successfully Moved Task!', 'success')
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
