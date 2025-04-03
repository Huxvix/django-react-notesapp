import {useState, useEffect} from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data) 
            .then((data) => setNotes(data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted."); // başarılı bir şekilde silindiyse
                else alert("Failed deleting note.");
                getNotes();
            }) 
            .catch((err) => alert(err));
    };

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title})
        .then((res) => {
            if (res.status === 201) alert("Note successfully created.");
            else alert("Failed creating note.");
            getNotes();
        })
        .catch((err) => alert(err));
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} key={note.id} onDelete={deleteNote}/>
            ))}
        </div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor='title'>Title</label>
            <br/>
            <input type='text'
                id='title'
                name='title'
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor='content'>Content</label>
            <br/>
            <textarea id='content'
                name='content'
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br/>
            <input type='submit' value='Submit'></input>
        </form>
    </div>
}

export default Home