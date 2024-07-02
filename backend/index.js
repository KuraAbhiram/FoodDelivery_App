const express = require("express");
const cors = require("cors")
const app = express()
const port = 5000
const mongoDB = require('./db')
mongoDB();

app.use(cors())

app.get('/',(req,res) => {
  res.send("Hello World")
})
app.use(express.json())
app.use('/api',require("./routes/CreateUser"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))

app.listen(port,()=>{
  console.log(`app listening on ${port}`)
})