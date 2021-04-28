import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async createList(body) {
    const res = await api.post('api/lists', body)
    AppState.lists = [...AppState.lists, res.data]
  }
}

export const listsService = new ListsService()
