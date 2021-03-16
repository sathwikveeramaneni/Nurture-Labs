const Advisor = require('../model/advisor');

exports.advisor = async (req, res) => {
    const { name, url } = req.body;
    console.log(req.body);
    if(name && url) {
        await Advisor.create({advisorName: name, photoUrl: url});
        res.sendStatus(200);
    }
    res.sendStatus(400);
}