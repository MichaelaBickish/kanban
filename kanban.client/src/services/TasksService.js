import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async createTask(body) {
    const res = await api.post('api/tasks', body)
    AppState.tasks[body.listId] = [...AppState.tasks[body.listId], res.data]
  }

  async deleteTask(task) {
    await api.delete('api/tasks/' + task.id)
    // NOTE because this is an object not an arry we need a different method to remove? Error is AppState.tasks.filter is not a function
    // the fix was to send the entire task as props.task over from the TasksComponent so that in here we can "dig into" the array within the object with tasks.[task.listId] so that we are accessing the array and can use the .filter array method
    AppState.tasks[task.listId] = AppState.tasks[task.listId].filter(t => t.id !== task.id)
  }
}
export const tasksService = new TasksService()
