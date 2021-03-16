// const Advisor = require('../model/advisor');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Advisor = require('../model/advisor');
const Booking = require('../model/booking');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});
    
    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if(userExist) return res.status(400).send('Email already exists');
    
    try {
        const user = await User.create({ name, email, password: hashPassword });
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200).send({
            token,
            id: user._id
        });
    } catch(e) {
        res.sendStatus(400);
    }
}

exports.login = async (req, res) => {
    const {name, password} = req.body;
    const user = await User.findOne({ name });

    if(!user)  return res.status(400).send('Name not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.sendStatus(401);

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.status(200).send({
        token,
        id: user._id
    })
}

exports.allAdvisors = async (req, res) => {
    const { userId } = req.params;
    const userExist = await User.findOne({ _id: userId });
    if(!userExist) res.status(400).send("User Not exist with user ID");
    if(userExist) {
        const advisor = await Advisor.find();
        res.status(200).send(advisor);
    }
    
}

exports.bookAdvisor = async (req, res) => {
    const { userId, advisorId } = req.params;
    const { bookingTime } = req.body;
    const userExist = await User.findOne({ _id: userId });
    if(!userExist) res.status(400).send("User Not exist with user ID");

    if(userExist) {
        await Booking.create({ advisorId, bookingTime });
        res.sendStatus(200);
    }
} 

exports.allBookings = async (req, res) => {
    const { userId } = req.params;
    const userExist = await User.findOne({ _id: userId });
    if(!userExist) res.status(400).send("User Not exist with user ID");

    if(userExist) {
        const bookings = await Booking.find();
        const result = await Promise.all(bookings.map( async (e) => {
            const advisor = await Advisor.findOne({ _id: e.advisorId });
            return {
                "Advisor Name": advisor.advisorName,
                "Advisor Profile Pic": advisor.photoUrl,
                "Advisor Id": advisor._id,
                "Booking Time":  e.bookingTime,
                "Booking Id": e._id
            }
        }));
        res.status(200).send(result);
    }

} 

