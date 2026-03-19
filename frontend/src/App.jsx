import axios from 'axios'
import  {  useEffect, useState } from 'react'

const App = () => {
  
  const [notedata, setnotedata] = useState([])
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')

  async function fetchNotesData() {
   
  const response = await axios.get ("http://localhost:3000/api/notes")
  setnotedata(response.data.notes)
  
  }
  useEffect(() => {
    fetchNotesData() 
    
},[])

 async function submitHandler(e) {
  e.preventDefault()
  const {title,description}=e.target.elements
   await axios.post("http://localhost:3000/api/notes", {
      title: title.value,
     description: description.value
   })
  fetchNotesData()
   
  settitle('')
  setdescription('')
  }

  async function deleteHandler(id) {
  
   await axios.delete("http://localhost:3000/api/notes/"+id)
    fetchNotesData()
    
  }
  
  
  return (
     <>
      <form onSubmit={(e) => {
       submitHandler(e)
        }} >
        <input
          required
          name='title'
          value={title}
          onChange={(e) => {
             settitle(e.target.value)
          }}
          type="text" placeholder='Enter title' />
        <input
          required
          name='description'
          value={description}
          onChange={(e) => {
            setdescription(e.target.value)
          }}
          type="text" placeholder='Enter description' />
        <button>create note</button>
      </form>
      <div className="notesinfo">
        {notedata.map((elem) => {
          return <div className='info'>
            <h1>{elem.title}</h1>
            <h2>{elem.description}</h2>
          
            <button onClick={()=>{deleteHandler(elem._id)}}>delete</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App
