import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'
import CommentSchema from '../models/Comment'
import ListSchema from '../models/List'
import TaskSchema from '../models/Task'
import ValueSchema from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Boards = mongoose.model('Board', BoardSchema)
  Lists = mongoose.model('List', ListSchema)

  Tasks = mongoose.model('Task', TaskSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
