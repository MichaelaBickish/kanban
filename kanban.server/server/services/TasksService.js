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
    return data
  }
}

export const tasksService = new TasksService()
