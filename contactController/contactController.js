//@desc Get contacts
//@route Get/api/contacts
//@access private

// const errorHandler = require("../middleware/errorHandler");
const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");


const getContacts = asyncHandler( async (req,res) =>{

    const tempContact = await Contact.find({user_id:req.user.id});
    res.status(200).json(tempContact);
});

//@desc Create contact
//@route Get/api/contacts
//@access private

const createContact = asyncHandler( async (req,res) =>{
    console.log("This is the body of the request " , req.body);

    

    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const tempContact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })

    res.status(200).json(tempContact);

});

//@desc get single contact
//@route Get/api/contacts/:id
//@access private

const getContact = asyncHandler( async (req,res) =>{

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Document not found")
    }
    res.status(200).json(contact);
});


//@desc Update contact
//@route Get/api/contacts/:id
//@access private

const updateContact = asyncHandler( async (req,res) =>{

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact doesn't exist ");
    }

    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user cannot update the contact of the other user ");
    }

    const upadatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(upadatedContact);
});

//@desc Delete contact
//@route Get/api/contacts/:id
//@access private

const deleteContact = asyncHandler( async (req,res) =>{

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact doesn't exist ");
    }

    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user cannot delete the contact of the other user ");
    }

    const contact1 = await Contact.findByIdAndRemove(req.params.id);

    res.status(200).json(contact1);
});

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};

