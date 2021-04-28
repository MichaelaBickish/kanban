import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    comments: [Comment]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Task.post('find', async(docs) => {
  // this is saying replaces what we tried to do in taskService line 28
  // docs is the result of the find
  for (const doc of docs) {
    await doc.populate('comments.creator', 'name picture').execPopulate()
  }
})
export default Task
