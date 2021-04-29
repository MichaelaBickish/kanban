<template>
  <div class="comment-component">
    <div class="float-right text-danger">
      <i class="fas fa-times action" title="delete comment" @click.stop="deleteComment(comment)"></i>
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
.action{
  cursor: pointer;
  z-index: 10;
}
</style>
