import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async delete(id) {
    const data = await dbContext.Lists.findOneAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted!'
  }

  async edit(body) {
    const data = await dbContext.Lists.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  // async findOne(query) {
  //   const board = await dbContext.Boards.findOne(query)
  //   // { _id: id._id, creatorId: creatorId.creatorId }
  //   if (!board) {
  //     throw new BadRequest('Invalid ID')
  //   }
  // }

  async find(query = {}) {
    const data = await dbContext.Lists.find(query)
    return data
  }
}

export const listsService = new ListsService()
