const express = require("express");
const app = express();
const port = 4000;
const db = require("./model/index");
const ejs = require("ejs");
const contactController = require("./controller/contactController");
const {multer, storage} = require("./services/multerConfig");
const upload = multer({storage: storage});
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

db.sequelize.sync({force:false});

app.get("/", contactController.viewContacts);

app.post("/addContact", upload.single("image"), contactController.addContact);

app.get("/addContact", contactController.renderContact);

app.use(express.static(path.join(__dirname, "uploads")));

app.get("/viewContacts", contactController.viewContacts);

app.get("/single/:id", contactController.viewSingleContact);

app.get("/delete/:id", contactController.delete);

app.get("/edit/:id", contactController.edit);

app.post("/updateContact/:id", upload.single('image'), contactController.updateContact);

app.get("/email", contactController.renderEmail);

app.post("/email", contactController.email);

//starting the server
app.listen(port, () => {
    console.log("Node server started at port 4000");
  });
  