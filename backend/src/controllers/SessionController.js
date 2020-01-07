const User = require('../models/User');
//Index, show, store, update, destroy
module.exports = {
    async index(req, res){
        const Users = await User.find({});

        return res.json(Users);
    },
    async store(req, res){
        const { email } = req.body;
        
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({email});
        }

        return res.json(user);
    }
};
