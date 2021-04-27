import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'
export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.findOne)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async delete(req, res, next) {
    try {
      const data = await commentsService.delete(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await commentsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await commentsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req, res, next) {
    try {
      const data = await commentsService.find({ _id: req.params.id, creatorId: req.userInfo.id })
      // { _id: req.params.id }, { creatorId: req.userInfo.id }
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await commentsService.find(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
