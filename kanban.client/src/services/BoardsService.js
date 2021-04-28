import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getMyBoards() {
    try {
      const res = await api.get('api/boards/')
      AppState.boards = res.data
      // console.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getOneBoard(id) {
    const res = await api.get('api/boards/' + id)
    AppState.activeBoard = res.data
  }

  // We are taking in the boardId here getListByBoardId(id) because in controller we are passing route.params.id
  async getListByBoardId(id) {
    // we are waiting for the api to return the list thats attatched to the boardId we selected
    const res = await api.get(`api/boards/${id}/lists`)
    // logger.log(res.data)
    // this line is saving the data we get back from the api into the appstate.list
    AppState.lists = res.data
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
