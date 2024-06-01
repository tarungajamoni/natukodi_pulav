const nm = require("nodemailer");
const express = require("express");
const path = require("path");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname,'build')));

app.post("/api", async (req, res) => {
    console.log("req.body", req.body)
  const { name, email, message } = req.body;
    const transporter = nm.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const options = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "test subject",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send("Failed to send email.");
        } else {
            console.log("Email sent successfully");
            res.status(200).send("Email sent successfully");
        }
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
