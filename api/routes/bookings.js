import express from 'express';
import { createBooking, deleteBooking, getBooking, getBookings, updateBooking } from '../controllers/booking.js';
import { verifyAdmin, verifyBooker } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/:bookid/:bookerid', verifyBooker, createBooking);

//UPDATE
router.put('/:id', verifyBooker, updateBooking);

//DELETE
router.delete('/:id/:bookid/:bookerid', verifyBooker, deleteBooking);

//GET
router.get('/:id', verifyBooker, getBooking);

//GET ALL
router.get('/', verifyAdmin, getBookings);

 
export default router