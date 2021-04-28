import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async createList(body) {
    const res = await api.post('api/lists', body)
    AppState.lists = [...AppState.lists, res.data]
  }

  async deleteList(id) {
    await api.delete('api/lists/' + id)
    AppState.lists = AppState.lists.filter(l => l.id !== id)
  }

  async getTaskByListId(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks = res.data
  }
}

export const listsService = new ListsService()
