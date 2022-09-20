import Booker from "../models/Booker.js";

export const updateBooker = async (req, res, next) => {
    try{
        const updateBooker = await Booker.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updateBooker);
    } catch(err) {
        next(err);
    }
}

export const deleteBooker = async (req, res, next) => {
    try{
        await Booker.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json('Booker has been deleted');
    } catch(err) {
        next(err);
    }
}

export const getBooker = async (req, res, next) => {
    try{
        const booker = await Booker.findById(
            req.params.id
        );
        res.status(200).json(booker);
    } catch(err) {
        next(err);
    }
}

export const getBookers = async (req, res, next) => {
    try{
        const bookers = await Booker.find();
        res.status(200).json(bookers);
    } catch(err) {
        next(err);
    }
}