import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    overBooked: {
        type: Boolean
    },
    contractAddress: {
        type: String,

    },
    contractJson: {
        type: String,

    },
    bookFee: {
        type: Number,
        required: true
    },
    availableBookings: {
        type: [Date]
    },
    unavailableBookings: {
        type: [Date]
    },
    bookings: {
        type: [String]
    },
}, { timestamps: true } );

export default mongoose.model('Book', BookSchema)