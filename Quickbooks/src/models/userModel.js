const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",

  new mongoose.Schema(
    {
        image: Array,
        name: String,
        email: { type: String, unique: true },
        phone: { type: String, unique: true },
        house: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        // image: String,
        hash: String,
        salt: String,
        addressCheck: { type: Boolean, default: false },
        billingAddress: {
          fullName: String,
          billingEmail: String,
          phone: String,
          house: String,
          city: String,
          state: String,
          zipCode: Number,
          country: String,
        },
        shippingAddress: {
          fullName: String,
          shippingEmail: String,
          phone: String,
          house: String,
          city: String,
          state: String,
          zipCode: Number,
          country: String,
        },
        isAdmin: { type: Boolean, default: false },
        isStaff: {
          status: { type: Boolean, default: false },
          surname: String,
          permissions: Array,
        },
        emailVerified: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
        favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
      },
    { timestamps: true }
  )
);

  
