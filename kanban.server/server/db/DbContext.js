import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import BoardSchema from '../models/Board'
import ValueSchema from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Boards = mongoose.model('Board', BoardSchema)
}

export const dbContext = new DbContext()
