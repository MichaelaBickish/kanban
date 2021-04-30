import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async delete(id, userId) {
    const data = await dbContext.Lists.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted!'
  }

  async edit(body) {
    const data = await dbContext.Lists.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async find(query = {}) {
    const data = await dbContext.Lists.find(query)
    return data
  }
}

export const listsService = new ListsService()
