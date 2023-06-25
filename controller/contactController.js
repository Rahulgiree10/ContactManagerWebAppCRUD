const db = require("../model/index");
const sendEmail = require("../services/sendEmail");

exports.viewContacts = async (req, res) => {
    const contacts = await db.contact.findAll(
        
        );
        
        
      console.log(contacts);
      res.render("viewContacts", {contacts});   
  
    };



exports.renderContact = async (req, res) => {
    res.render("addContact");
  };


exports.addContact = async (req, res) => {
    const {firstName, lastName, phone, email, image } = req.body; //calling objects from the body separately
    console.log(firstName, lastName, phone, email, image);

    db.contact.create({
      //inserting data into database
      firstName: firstName,
      lastName: lastName,
      phone : phone,
      email : email,
      Image	: "http://localhost:4000/" + req.file.filename,
    });
    res.redirect("/viewContacts");    
};

exports.viewSingleContact = async (req,res) => {
    const contacts = await db.contact.findAll({
      where:{
        id : req.params.id
      }
    });

    res.render("viewSingleContact", {contact: contacts[0]});
  }

exports.delete = async (req, res) => {
  console.log(req.params.id);
  const contacts = await db.contact.destroy({
    where:{
      id : req.params.id
    }
  });
  res.redirect("/");
}

exports.edit = async (req, res) => {
  const contacts = await db.contact.findAll({
    where:{
      id: req.params.id
    }
  });

  res.render("editContact",{contact: contacts[0]});
};

exports.updateContact = async (req, res) => {
  const {firstName, lastName, phone, email, image } = req.body; 
  updatedData = {
    firstName: firstName,
    lastName: lastName,
    phone : phone,
    email : email,
  };

  //Update image only if new image is selected
  if (req.file) {
    const image = "http://localhost:4000/" + req.file.filename;
    updatedData.Image = image;
  }

  await db.contact.update(updatedData, { //you wrote only contacts are update
    where: {
      id: req.params.id,
    },
  })
  console.log("Updated successfully")
  res.redirect("/")
}














//email
exports.email = async (req, res)=>{
  try{
  const {message} = req.body;
  console.log(message);
  
  await sendEmail({
    to: "prathamneupane5@gmail.com",
    text: message,
    subject: "Notification",
  });
}
catch(e){
  // res.render("error");
  console.log("first")
}
}

exports.renderEmail = async (req, res) => {
  res.render("notification");
};