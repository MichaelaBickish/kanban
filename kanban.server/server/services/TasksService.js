import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async delete(id) {
    const data = await dbContext.Tasks.findOneAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted!'
  }

  async edit(body) {
    const data = await dbContext.Tasks.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async find(query = {}) {
    const data = await dbContext.Tasks.find(query)
      .populate('creator', 'name picture')
      // .populate({ path: 'comments', populate: { path: 'creator', model: 'Account' } })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  // this is our post for comments
  async createComment(taskId, body) {
    const task = await dbContext.Tasks.findOne({ _id: taskId, creatorId: body.creatorId })
    task.comments.push(body)
    await task.save()
    return task
  }

  async deleteComment(taskId, commentId, creatorId) {
    const task = await dbContext.Tasks.findById({ _id: taskId, creatorId: creatorId })
    const comment = task.comments.id(commentId)
    // this if statement allows the creator of the task to delete any comments on the task
    if (task.creatorId === creatorId || comment.creatorId === creatorId) {
      comment.remove()
      await task.save()
      return task
    }
  }
}

export const tasksService = new TasksService()
