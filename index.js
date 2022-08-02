const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const handlebars = require('handlebars')
const path = require('path');
const fs = require('fs')

let PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// app.post("/contact", cors(), async (req, res) => {
//     let reqBody = req.body
//     let name = reqBody.params['name']
//     let email = reqBody.params['email']
//     let message = reqBody.params['message']
//     console.log(name)
//     console.log(email)
//     console.log(message)

//     let transporter = nodemailer.createTransport({
//         service: "gmail",// true for 465, false for other ports
//         auth: {
//             user: "mohammedthalhama.ece2020@citchennai.net", // put your email id here
//             pass: "welcometocit", // put your password here
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     try {
//         // send mail with defined transport object
//         let info = await transporter.sendMail({
//             from: '"HandyMan Services 👷" <handyservices.com>',
//             to: "mohammedalithalha2002@gmail.com", // put your email id here
//             subject: "Contact Form Submission",
//         });
//         console.log(info.response)
//         return "success"
//     } catch (error) {
//         console.log(error)
//         return "error"
//     }
// })




app.post("/send_mail", cors(), async (req, res) => {
    let reqBody = req.body
    let email = reqBody.params['email']
    let message = reqBody.params['message']
    console.log(email)
    console.log(message)

    const filePath = path.join(__dirname, './views/MailTemplate.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        message_content: message
    };
    const htmlToSend = template(replacements);

    let transporter = nodemailer.createTransport({
        service: "gmail",// true for 465, false for other ports
        auth: {
            user: "mohammedthalhama.ece2020@citchennai.net", // put your email id here
            pass: "welcometocit", // put your password here
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"HandyMan Services 👷" <handyservices.com>',
            to: email,
            subject: "Request for a work through Handyman servcies",
            html: htmlToSend,
            attachments: [
                {
                    filename: 'image-1.png',
                    path: `./views/images/image-1.png`,
                    cid: 'image1' //same cid value as in the html img src
                },
                {
                    filename: 'image-2.png',
                    path: `./views/images/image-2.png`,
                    cid: 'image2' //same cid value as in the html img src
                },
                {
                    filename: 'image-3.png',
                    path: `./views/images/image-3.png`,
                    cid: 'image3' //same cid value as in the html img src
                },
                {
                    filename: 'image-4.png',
                    path: `./views/images/image-4.png`,
                    cid: 'image4' //same cid value as in the html img src
                },
                {
                    filename: 'image-5.png',
                    path: `./views/images/image-5.png`,
                    cid: 'image5' //same cid value as in the html img src
                },
            ]
        });
        console.log(info.response)
        return "success"
    } catch (error) {
        return "error"
    }

})

app.listen(PORT, () => {
    console.log('listening on the port ' + PORT);
})