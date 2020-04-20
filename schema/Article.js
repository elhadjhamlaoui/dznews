import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  source: String,
  sourceAr: String,
  link: String,
  image: String,
  title: { type: String, unique: true },
  desc: String,
  readableTime: String,
  dateTime: String,
  created_at: { type: Date, default: Date.now },
})
export default ArticleSchema
