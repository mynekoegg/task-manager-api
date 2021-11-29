const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail =(email, name)=>{
    sgMail.send({
        to: email,
        from: 'tgchen@wynetech.com',
        subject: 'Sending with SendGrid is Fun',
        text: `text is from sendergrid, ${name}. what's up`
    })

}
const sendCancelEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'tgchen@wynetech.com',
        subject: 'thank for using nodejs task',
        text: `your account has been deleted. ${name}.Hope to see you again`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancelEmail
}