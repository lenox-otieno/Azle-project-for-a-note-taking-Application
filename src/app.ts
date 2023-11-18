// src/app.ts
import * as azle from 'azle';

const app = azle.createApp();
app.use(azle.json());

interface Note {
  id: number;
  title: string;
  content: string;
}

let notes: Note[] = [];
let noteIdCounter = 1;

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }

  const newNote: Note = {
    id: noteIdCounter++,
    title,
    content,
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }

  notes.splice(noteIndex, 1);

  res.json({ message: 'Note deleted successfully' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
