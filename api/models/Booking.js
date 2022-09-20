import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
    booker: {
        type: Schema.ObjectId,
        ref: 'Booker',
        required: true
    },
    book: {
        type: Schema.ObjectId,
        ref: 'Book',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    start: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Boolean,
        default: false
    },
    checkOut: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    txnId: {
        type: String
    },
    rfndId: {
        type: String
    }
}, { timestamps: true } );

export default mongoose.model('Booking', BookingSchema)