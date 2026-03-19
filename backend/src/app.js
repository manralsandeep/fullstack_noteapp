//server create

//server config

const express = require("express")
const app = express()  //server created
const noteModel = require("./model/notes.model")
const cors = require("cors")
const path = require("path")
app.use(express.static("./public"))
app.use(express.json())
app.use(cors())


//post method endpoint

app.post("/api/notes", async (req,res) => {
     
    const { title, description } = req.body
    
   const note= await noteModel.create({
         title,description
   })
    
    res.status(201).json({
        message: "notes created sucessfully",
        note
    }) 
    
   
})
// get method endpoint
app.get("/api/notes", async (req, res) => {
    
    const notes = await noteModel.find()

    res.status(200).json({
        message: "notes fetched sucessffully",
        notes
    })
})


//delete method enpoint
app.delete("/api/notes/:id", async (req, res) => {
    const id =req.params.id
    await noteModel.findByIdAndDelete(id)   
    res.status(200).json({
        message: "note deleted sucessfully"
        
    })
})

//patch method  endpoint
app.patch("/api/notes/:id", async (req, res) => {
    const id =req.params.id
   const note= await noteModel.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({
        message: "note modified sucessfully",
        note
    })
})


app.use("*name", (req, res) => {
   res.sendFile(path.join(__dirname ,"..","/public/index.html"))
})

module.exports=app

