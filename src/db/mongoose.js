const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true
})

 



/* const Task = new Tasks({
    description: ' T hi s descrip tion of a task  '
})

Task.save().then(()=>{
    return console.log(Task)
}).catch((error)=>{
    return console.log("Error", error)
}) */

/* const Me = new User({
    name: '  Eric   ',
    email: 'Eric@Gmail.com   ',
    password: ' sd3s123d'

})

Me.save().then(()=>{
   return console.log(Me)
}).catch((error)=>{
    return console.log("Error", error)
}) */