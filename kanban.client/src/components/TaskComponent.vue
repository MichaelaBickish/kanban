<template>
  <div class="task-component shadow rounded ml-3">
    <!-- this is injected into the list component -->
    {{ task.title }}
  </div>
</template>

<script>
export default {
  name: 'TaskComponent',
  props: {
    task: {
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

</style>
