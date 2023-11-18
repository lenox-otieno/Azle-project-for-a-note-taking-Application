// src/app.ts
import * as azle from 'azle';

const app = azle.createApp();

// Middleware Configuration
app.use(azle.json());

interface Note {
  id: number;
  title: string;
  content: string;
}

let notes: Note[] = [];
let noteIdCounter = 1;

app.get('/notes', (req, res) => {
  try {
    res.json(notes);
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/notes', (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNote: Note = {
      id: noteIdCounter++,
      title,
      content,
    };

    notes.push(newNote);

    res.status(201).json(newNote);
  } catch (error) {
    handleError(res, error);
  }
});

app.delete('/notes/:id', (req, res) => {
  try {
    const noteId = parseInt(req.params.id, 10);

    if (isNaN(noteId) || noteId <= 0) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }

    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    notes.splice(noteIndex, 1);

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Helper function for handling errors
function handleError(res: azle.Response, error: any) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
        
