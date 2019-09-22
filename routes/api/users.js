const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//validation function
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//loading user model
const User = require('../../models/User');

 router.post('/register', (req,res) =>{
    
    //Form validation    
    const { errors,isValid } = validateRegisterInput( req.body );
    //Check validation
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            return res.status(400).json({email:'Email already exist'});
        }
        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                address:req.body.address
            });
        //Hashing Password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user =>res.json(user))
                .catch(err=>console.log(err));

            });
        });
        }
    });
});



router.post('/login', (req,res) =>{
    //Form Validation
    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation 
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
    .then(user =>{
        //Check if user exists
        if(!user){
            return res.status(400).json({ emailnotfound:'Email not found'});
        }

        //Check for password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(isMatch){
                //User matched
                //Creating jwt payload
                const payload = {
                    id: user.id,
                    name: user.email
                };
                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
    
                    },
                    (err,token) =>{
                        res.json({
                            success: true,
                            token: 'Bearer '+token
                        });
                    }
                );
            } else{
                return res.status(400).json({passwordincorrect: "Password incorrect"});
            }
            
        });
    })
})

module.exports = router;