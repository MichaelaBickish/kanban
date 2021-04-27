import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async delete(id) {
    const data = await dbContext.Boards.findOneAndDelete(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted!'
  }

  async edit(body) {
    // bring in the creatorId: body.creatorId checks to make sure the person editing is also the person who created it.
    const data = await dbContext.Boards.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async findOne(query) {
    const board = await dbContext.Boards.findOne(query)
    // { _id: id._id, creatorId: creatorId.creatorId }
    if (!board) {
      throw new BadRequest('Invalid ID')
    }
    return board
  }

  async find(query = {}) {
    const data = await dbContext.Boards.find(query)
    return data
  }
}

export const boardsService = new BoardsService()
