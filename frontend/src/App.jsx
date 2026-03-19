import axios from 'axios'
import  {  useEffect, useState } from 'react'

const App = () => {
  
  const [notedata, setnotedata] = useState([])
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')

  //Modal related states 
  const [isModalOpen, setisModalOpen] = useState(false)
  const [editTitle, seteditTitle] = useState("")
  const [editDescription, seteditDescription] = useState("")
  const [editingNoteId, seteditingNoteId] = useState(null)

  async function fetchNotesData() {
   
  const response = await axios.get ("https://fullstack-noteapp-4.onrender.com/api/notes")
  setnotedata(response.data.notes)
  
  }
  useEffect(() => {
    fetchNotesData() 
    
},[])

 async function submitHandler(e) {
  e.preventDefault()
  const {title,description}=e.target.elements
   await axios.post("https://fullstack-noteapp-4.onrender.com/api/notes", {
      title: title.value,
     description: description.value
   })
  fetchNotesData()
   
  settitle('')
  setdescription('')
  }

  async function deleteHandler(id) {
  
   await axios.delete("https://fullstack-noteapp-4.onrender.com/api/notes/"+id)
    fetchNotesData()
    
  }
 
  const OpenEditModel = (note) => {
    seteditDescription(note.description)
    seteditTitle(note.title)
    seteditingNoteId(note._id)
    setisModalOpen(true)
    
  }

 async function handleSaveEdit() {
   const res = await axios.patch("https://fullstack-noteapp-4.onrender.com/api/notes/" + editingNoteId, {
     title: editTitle,
     description:editDescription
   })
   
   setnotedata(notedata.map((n) => {
     return  n._id===editingNoteId ?res.data.note:n
   }))

   setisModalOpen(false)
   
   seteditingNoteId(null)
    

 }
  
  
  return (
    <> 
     
      <form onSubmit={(e) => {
       submitHandler(e)
      }} >
        <h2>My note app</h2>
        <input
          required
          name='title'
          value={title}
          onChange={(e) => {
             settitle(e.target.value)
          }}
          type="text" placeholder='Enter title' />
        <textarea
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
            <h3>{elem.title}</h3>
            <p>{elem.description}</p>
            <div className='notebuttons'>
              <button className='delete' onClick={() => { deleteHandler(elem._id) }}>Delete</button>
              <button className='edit' onClick={()=>{OpenEditModel(elem)}} >Edit</button>
             </div>
          </div>
        })}
      </div>

       {isModalOpen && <div className='modal'>
        <div className='modalchild'>
          <input value={editTitle}
            onChange={(e) => {
             
               seteditTitle(e.target.value)
           }}
            name="title" type="text" placeholder='edit title' />
          <textarea
            value={editDescription}
             
            onChange={(e) => {
              seteditDescription(e.target.value)
            }}
            
            name="description" placeholder='edit description' id=""></textarea>
          <div className='buttons'>
            <button
            onClick={()=>{handleSaveEdit()}}
              
              className='button save'>Save</button>
            <button
              onClick={() => {
                setisModalOpen(false)
                seteditingNoteId(null);
              }}
              className='button cancel'>Cancel</button>

        </div>
        </div>
        
      </div> }
    </>
  )
}

export default App
