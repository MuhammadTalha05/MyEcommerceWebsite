const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    products: [
        {
          type: mongoose.ObjectId,
          ref: "Products",
        },
      ],
      payment: {},
      buyer: {
        type: mongoose.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
        // default: "Not Process",
        default: "Completed",
        // enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
      },
},{
  timestamps:true,
})


const orderModelSchema = mongoose.model('Order', orderSchema)

module.exports = orderModelSchema;