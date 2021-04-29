import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async delete(id) {
    const data = await dbContext.Comments.findOneAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted!'
  }

  async edit(body) {
    const data = await dbContext.Comments.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async create(body) {
    return await dbContext.Tasks.findOneAndUpdate(body)
  }

  async find(query = {}) {
    const data = await dbContext.Comments.find(query)
    return data
  }
}

export const commentsService = new CommentsService()
