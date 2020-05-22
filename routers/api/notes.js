const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Note = require('../../models/Notes')
const Users = require('../../models/Users')


// @route    POST api/notes
// @desc     Store User Note
// @Access   Private

router.post('/', [auth, [
    check('title', 'Title text is required').not().isEmpty(),
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
        const noteArray =  req.body.note.split('....').map(n=> n.trim())
        const newNote = new Note({
            user: req.user.id,
            title: req.body.title,
            note: noteArray
        });
        const NoteObj = await newNote.save();
        const allNote = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.json(allNote);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});

// @route    PUT api/notes
// @desc     update note 
// @Access   Private


router.put('/', auth, [
    check('note_id', 'note ID is required').not().isEmpty(),
    check('title', 'Title text is required').not().isEmpty(),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await Users.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: "User doess not have account " })
        }
        // Delete Note 
        const NoteObj = await Note.findOne({ _id: req.body.note_id });
        if (NoteObj.user.toString() === req.user.id.toString()) {
            await Note.findOneAndDelete({ _id: req.body.note_id })
        }
        // Create a new note 
        const noteArray =  req.body.note.split('....').map(n=> n.trim())
        const newNote = new Note({
            user: req.user.id,
            title: req.body.title,
            note: noteArray
        });
         await newNote.save();

        const allNote = await Note.find({ user: req.user.id }).sort({ date: -1 });
        console.log('Update')
        res.json(allNote);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});


//@route    GET api/notes
// @desc    Get all Notes
//@Access   Private

router.get('/', auth, async(req, res) => {
    try {
        const allNote = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.json(allNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/notes/remove/:note_id
// @desc    DELETE node object 
//@Access   Private

router.get('/remove/:note_id', auth, async(req, res) => {
    try {
        const NoteObj = await Note.findOne({ _id: req.params.note_id });

        if (NoteObj.user.toString() === req.user.id.toString()) {
            await Note.findOneAndDelete({ _id: req.params.note_id })
            return res.json({ msg: "deleted" });
        }
        res.json({ msg: "cannot delete" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports= router;

/*  POST /api/notes/  CREATE  Store Note 

curl -d '{ "title" :"Vault test", "note" : "Note 2"}' -H "Content-Type: application/json" \
-H "x-auth-token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWMzMjllYjFmNmUwM2E0ZmNkNWQ3In0sImlhdCI6MTU4NzE5NTcwMiwiZXhwIjoxNTg3MTk5MzAyfQ.bOy2sN2ild7JpcVQOH4UFQkc2uoFhf1aYWkRuxNOBj4" -X POST "http://localhost:5000/api/notes/"
*/

/*   PUT /api/notes update notes 
curl -d '{ "title" :"Vault test", "note" : "Note 2", "note_id":"5ec556b751c1e1353fc6ccf2", "user" : "5e9d8ab7cae66904384eeb4a"}' 
-H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU5ZDhhYjdjYWU2NjkwNDM4NGVlYjRhIn0sImlhdCI6MTU4OTk5MjA0NCwiZXhwIjoxNTkwMDIyMDQ0fQ.wEqwSmzJmHzv1KkJkKxfZ-QYrhSY53anyqrelXj6KT4" -X PUT http://localhost:5000/api/notes/

*/

/*  GET api/notes  GET notes
curl -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWMzMjllYjFmNmUwM2E0ZmNkNWQ3In0sImlhdCI6MTU4NzE4NzIwOCwiZXhwIjoxNTg3MTkwODA4fQ.Nyn9LgdvW-HtmYtlh0PjXgZrwqP-RhGsabfp8ix_F_I"\
 -X GET "http://localhost:5000/api/notes/"

*/

/*  GET api/notes/remove/:note_id DELETE a post
curl -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4ZWMzMjllYjFmNmUwM2E0ZmNkNWQ3In0sImlhdCI6MTU4NzE4NzIwOCwiZXhwIjoxNTg3MTkwODA4fQ.Nyn9LgdvW-HtmYtlh0PjXgZrwqP-RhGsabfp8ix_F_I"\
 -X GET "http://localhost:5000/api/notes/remove/:note_id"

*/