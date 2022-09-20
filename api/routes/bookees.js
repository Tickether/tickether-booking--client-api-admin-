import express from 'express';
import { countByGenre, countByRegion, createBookee, deleteBookee, getBookee, getBookeeBooks, getBookees, updateBookee } from '../controllers/bookee.js';
import { verifyAdmin, verifyBookee, verifyBooker } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post('/', verifyBookee, createBookee);

//UPDATE
router.put('/:id', verifyBookee, updateBookee);

//DELETE
router.delete('/:id', verifyBookee, deleteBookee);

//GET
router.get('/find/:id', getBookee);

//GET ALL
router.get('/', getBookees);

router.get('/countByGenre', countByGenre);

router.get('/countByRegion', countByRegion);

router.get('/books/:id', getBookeeBooks)

export default router 