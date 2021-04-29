import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.findOne)
      .post('', this.create)
      .post('/:id/comments', this.addComment)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .delete('/:id/comments/:commentId', this.deleteComment)
  }

  async deleteComment(req, res, next) {
    try {
      const task = await tasksService.deleteComment(req.params.id, req.params.commentId, req.userInfo.id)
      return res.send({ message: 'comment removed', data: task })
    } catch (error) {
      next(error)
    }
  }

  async addComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createComment(req.params.id, req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    // delete only takes in an id NOT a body post & put passes a body
    try {
      const data = await tasksService.delete(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await tasksService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await tasksService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req, res, next) {
    try {
      const data = await tasksService.find({ _id: req.params.id, creatorId: req.userInfo.id })
      // { _id: req.params.id }, { creatorId: req.userInfo.id }
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await tasksService.find(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
