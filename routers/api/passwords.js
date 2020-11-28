const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Password = require('../../models/Password')
const Users = require('../../models/Users')
const { encrypt, decrypt } = require('../../middleware/encryption')


// @route    POST api/passwords
// @desc     Store User password
// @Access   Private 

router.post('/', [auth, [
    check('title', 'Text is required').not().isEmpty(),
    check('accountId', 'Account ID is required').not().isEmpty(),
    check('password', 'Password field is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await Users.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: "User doess not have account " })
        }

        const newPassword = new Password({
            title: encrypt(req.body.title),
            accountId: encrypt(req.body.accountId),
            password: encrypt(req.body.password),
            user: req.user.id
        });
        const passwordObj = await newPassword.save();
        const allPassword = await Password.find({ user: req.user.id }).sort({ date: -1 });
        res.json(allPassword);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});


//@route    GET api/passwords
// @desc    Get all passwords
//@Access   Private

router.get('/', auth, async(req, res) => {
    var alldecyptedPassword  =[];
    try {
        var allPassword = await Password.find({ user: req.user.id }).sort({ date: -1 });
        allPassword.map( passwd => alldecyptedPassword.unshift({
            title : decrypt(passwd.title),
            accountId : decrypt(passwd.accountId),
            password : decrypt(passwd.password),
            user : passwd.user
        }))
        console.log(alldecyptedPassword)
        res.json(alldecyptedPassword);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    GET api/passwords/remove/:pwd_id
// @desc    DELETE password object 
//@Access   Private

router.get('/remove/:pwd_id', auth, async(req, res) => {
    try {
        const passwordObj = await Password.findOne({ _id: req.params.pwd_id });

        if (passwordObj.user.toString() === req.user.id.toString()) {
            await Password.findOneAndDelete({ _id: req.params.pwd_id })
            return res.json({ msg: "deleted" });
        }
        res.json({ msg: "cannot delete" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;


/*  POST /api/passwords/  CREATE  Store Password 

curl -d '{ "title" :"Vault Project", "accountId": "nikilmunireddy066@gmail.com", "password": "abcd12"}' -H "Content-Type: application/json" \
-H "x-auth-token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWMzMjllYjFmNmUwM2E0ZmNkNWQ3In0sImlhdCI6MTU4NjQxNDM3NywiZXhwIjoxNTg2Nzc0Mzc3fQ.-NNVrUXitySsS8563euANxhB3FKuRV_GIXIqH06kSr8" -X POST "http://localhost:5000/api/passwords/"
*/

/*  GET api/passwords  GET passwords
curl -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWMzMjllYjFmNmUwM2E0ZmNkNWQ3In0sImlhdCI6MTU4NjQxNDM3NywiZXhwIjoxNTg2Nzc0Mzc3fQ.-NNVrUXitySsS8563euANxhB3FKuRV_GIXIqH06kSr8"\
 -X GET "http://localhost:5000/api/passwords/"

*/

/*  GET api/passwords/remove/:pwd_id DELETE a post
curl -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWMzMjllYjFmNmUwM2E0ZmNkNWQ3In0sImlhdCI6MTU4NjQzMDU4NCwiZXhwIjoxNTg2NDM0MTg0fQ.KmTdVkJP8SSUr-iNnrwGvX8yTbuPvlaU-gHLBEntYtg"\
 -X GET "http://localhost:5000/api/passwords/remove/:pwd_id"

*/