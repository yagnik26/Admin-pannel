const admin = require("../models/admin");

let checkData = async (req, res, next) => {
    let user = req.body;
    console.log(user);
    let data = await admin.findOne({username : user.username}) || "" ;
    console.log(data.username);
    if(data.username){
        res.status(400).send('data already exists');
    }
    else{
        next();
    }
}

module.exports = checkData;