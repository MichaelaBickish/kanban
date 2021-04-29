<template>
  <div class="task-component shadow rounded m-3 ">
    <!-- this is injected into the list component -->

    <div class="card">
      <div class="card-body">
        <div class="text-right">
          <i class="fas fa-times text-danger" @click="deleteTask(task)"></i>
        </div>
        {{ task.title }}

        <!-- btn -->
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            Comment
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <!-- start -->
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Add Comment..." aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">
                  +
                </button>
              </div>
            </div>
            <!-- end -->

            <li class="dropdown-item">
              Action
            </li>
            <li class="dropdown-item">
              Another action
            </li>
            <li class="dropdown-item">
              Something else here
            </li>
          </div>
        </div>
      <!-- btn -->
      </div>
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
export default {
  name: 'TaskComponent',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteTask() {
        try {
          if (await Notification.confirmAction()) {
            await tasksService.deleteTask(props.task)
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

</style>
