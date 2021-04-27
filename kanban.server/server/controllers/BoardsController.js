import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import BaseController from '../utils/BaseController'
export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.findOne)
      .get('/:id/lists', this.getListsByBoardId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getListsByBoardId(req, res, next) {
    try {
      const lists = await listsService.find({ boardId: req.params.id })
      res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await boardsService.delete(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // Using creatorId here is called in service. makes sure the creator is the person that's logged in.
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await boardsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await boardsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req, res, next) {
    try {
      const data = await boardsService.findOne({ _id: req.params.id, creatorId: req.userInfo.id })
      // { _id: req.params.id }, { creatorId: req.userInfo.id }
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await boardsService.find({ creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
