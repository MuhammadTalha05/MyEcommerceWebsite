const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      slug: {
        type: String,
        lowercase: true,
      }
},{
  timestamps:true,
})


const categoryModelSchema = mongoose.model('Category', CategorySchema)

module.exports = categoryModelSchema;