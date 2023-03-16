const express=require('express');
const { body } = require('express-validator');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note=require('../models/Notes');
const {validationResult } = require('express-validator');

// Get all the notes using GET.Login req
router.get('/fetchallnotes', fetchuser,  async (req, res) => {

    try {
        const notes=await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error')
    }
})

// ADd a new note using post.Login req
router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({min: 3}),
    body('description','5 letters description must be there').isLength({min: 5}),
], async (req, res) => {
   try {
     const {title,description,tags}=req.body;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     const note=new Note(
         {
             title,description,tags,user: req.user.id
         }
        
     )
     const savednote=await note.save();
     res.json(savednote);
   } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal server error')
   }

})

//Update a note using post.Login req
router.put('/updatenote/:id', fetchuser,  async (req, res) => {

       try {
        const {title,description,tags}=req.body;
        //craete a new note object
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tags){newNote.tags=tags};

        //Find the note and update it
        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //note.user.tostring gives us the id of user who has originally craeted the note
        if(note.user.toString() != req.user.id)
        {
            return res.status(401).send("Unauthorized user");
        }

        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{ new:true})
        res.json(newNote)
            

       } catch (error) {
        console.log(error.message);
    res.status(500).send('Internal server error')
       }

})

//Deleting a note using delete.Login required
router.put('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router;