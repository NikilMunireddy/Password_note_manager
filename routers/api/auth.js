const express = require('express');
const router = express.Router();
var config = require('config');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth= require('../../middleware/auth')
const Users = require('../../models/Users')


//@route    GET api/auth
// @desc    Check if authenticated 
//@Access   Public 

router.get('/',auth ,async (req, res)=> {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


//@route    POST api/auth
//@desc    Authenticate user & get Token
//@Access   Public 


router.post('/', [
    check('email','Enter valid email').isEmail(),
    check('password','Password auth required').exists()
],
async (req, res)=> {
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password} =req.body;

    try {
        let user = await Users.findOne({email});
        console.log(user)
        if(!user){
            return res.status(400).json({errors : [{ msg: "Invalid Creds"}]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({errors : [{ msg: "Invalid Creds"}]})
        }
        const payload= {
            user:{
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtsecret'),
            { expiresIn: 300}, 
            (err, token)=>{
                if(err) throw err;
                console.log(token)
                res.json({token});
            })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
    
});


module.exports= router;

/* GET all passwords of logged in user 

 curl -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWRjMTQ5YTI2ZTkxMWYwOTE1MTYxIn0sImlhdCI6MTU4NjQyMDc1NiwiZXhwIjoxNTg2NzgwNzU2fQ.DwDZeVkolXt1oqLt9Xrjz4aWlpatu3fbKYN42n0Yq3g" \
 -X GET "http://localhost:5000/api/passwords/"

 */


 /* ADD password for user 

  curl -d '{ "title" :"Vault Project", "accountId": "nikilmunireddy066@gmail.com", "password": "abcd12"}' -H "Content-Type: application/json"\
   -H "x-auth-token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWRjMTQ5YTI2ZTkxMWYwOTE1MTYxIn0sImlhdCI6MTU4NjQyMDc1NiwiZXhwIjoxNTg2NzgwNzU2fQ.DwDZeVkolXt1oqLt9Xrjz4aWlpatu3fbKYN42n0Yq3g" -X POST "http://localhost:5000/api/passwords/"

  */

   /*
User Login

curl -d '{"email":"nikilmunireddy066@gmail.com", "password":"abcd12"}'  \
-H "Content-Type: application/json" -X POST "http://localhost:5000/api/auth"

*/