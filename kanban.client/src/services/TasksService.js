import { AppState } from '../AppState'
import { api } from './AxiosService'
import { listsService } from './ListsService'

class TasksService {
  async createTask(body) {
    const res = await api.post('api/tasks', body)
    AppState.tasks[body.listId] = [...AppState.tasks[body.listId], res.data]
  }

  async moveTask(task, listId) {
    const oldListId = task.listId
    task.listId = listId
    await api.put('api/tasks/' + task.id, task)
    listsService.getTaskByListId(oldListId)
    listsService.getTaskByListId(task.listId)
  }

  async deleteTask(task) {
    await api.delete('api/tasks/' + task.id)
    // NOTE because this is an object not an arry we need a different method to remove? Error is AppState.tasks.filter is not a function
    // the fix was to send the entire task as props.task over from the TasksComponent so that in here we can "dig into" the array within the object with tasks.[task.listId] so that we are accessing the array and can use the .filter array method
    AppState.tasks[task.listId] = AppState.tasks[task.listId].filter(t => t.id !== task.id)
  }

  async createComment(body) {
    await api.post(`api/tasks/${body.taskId}/comments/`, body)
    // AppState.tasks[body.listId].comments[body.taskId] = [...AppState.tasks[body.listId].comments[body.taskId], res.data]
    listsService.getTaskByListId(body.listId)
    // this is basically redrawing all the tasks using the method we created in listService which brings back the task and all the comments attached to that task
  }

  async deleteComment(task, comment) {
    await api.delete('api/tasks/' + task.id + '/comments/' + comment.id)
    // AppState.tasks[task.listId] = AppState.tasks[task.listId].filter(t => t.id !== comment.id)
    // TODO come back and make it work with out the 2ns api call (the listsService part)
    listsService.getTaskByListId(task.listId)
  }
  // TODO add an edit function for the task that we will use to move the task from one list to another
}
export const tasksService = new TasksService()
