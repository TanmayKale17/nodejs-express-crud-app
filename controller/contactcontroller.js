const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModels");
// Get all contacts
// path: /api/contacts
const GetContact = asyncHandler(async(req, res) => {
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

// path: /api/contacts
// Post a contact
const PostContact=asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    res.status(400);
    if(!name || !email || !phone){
        throw new Error("All fields are mandatory");
    }
    const contacts= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });


    
    res.status(200).json(contacts);
}); 

// path: /api/contacts
// Delete a contact
const DeleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.variable);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user's contact");
    }
    await Contact.deleteOne({_id:contact._id});
    res.status(200).json({message:`DELETING CONTACT ${contact.phone}`}); 
});

// path: /api/contacts/:variable
// Put a contact
const PutContact=asyncHandler(async(req,res)=>{
    
    const contact=await Contact.findById(req.params.variable);
    
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json({message:`Updating Contact for ${contact.name}`});

    const UpdatedContact=await Contact.findByIdAndUpdate(
        req.params.variable,
        req.body,
        {new:true}
    )
});

// path: /api/contacts/:variable
// Get a contact by id
const GetContactById=asyncHandler(async(req,res)=>{

    const contact=await Contact.findById(req.params.variable)

    if(!contact){   
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

const DeleteContactbyId=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.variable)
    
    if(!contact){   
        res.status(404);
        throw new Error("Contact Not Found");
    }
    
    res.status(200).json({message:`DELETING CONTACT ${contact.phone}`});
    await Contact.deleteOne({_id:contact._id})
});

const UpdateContactbyId=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.variable)
    
    if(!contact){   
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }
    
    res.status(200).json({message:`UPDATING CONTACT ${contact.phone}`});
    await Contact.findByIdAndUpdate(req.params.variable,req.body,{new:true})
});  





module.exports={GetContact,PostContact,DeleteContact,PutContact,GetContactById,DeleteContactbyId,UpdateContactbyId };