<template>
  <div class="comment-component">
    <div class="float-right text-danger">
      <label for="delete this list" class="list-delete mt-3 mr-2">
        <i class="fas fa-times" @click="deleteComment(comment)"></i>
      </label>
    </div>
    <li>
      {{ comment.body }}
    </li>
    <p>
      ~ {{ comment.creator.name }}
    </p>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import Notification from '../utils/Notification'
export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteComment() {
        try {
          // console.log(props.comment)
          if (await Notification.confirmAction()) {
            await tasksService.deleteComment(props.task, props.comment)
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
