import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getMyBoards() {
    try {
      const res = await api.get('api/boards/')
      AppState.boards = res.data
      console.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createBoard(body) {
    const res = await api.post('api/boards', body)
    AppState.boards = [...AppState.boards, res.data]
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
    AppState.boards = AppState.boards.filter(board => board.id !== id)
  }
}

export const boardsService = new BoardsService()
