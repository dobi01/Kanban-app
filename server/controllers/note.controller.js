import Note from '../models/note';
import uuid from 'uuid';
import Lane from '../models/lane';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function editNote(req, res) {
  if (!req.body.task) {
    res.status(403).end();
  }

  Note.findOneAndUpdate({ id: req.params.noteId }, { task: req.body.task }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note });
    res.status(200).end();
  });
}

export function deleteNote(req, res) {
  if (!req.body.laneId) {
    res.status(400).end();
  }

  Note.findOneAndRemove({ id: req.params.noteId })
    .then(() => Lane.findOne({ id: req.body.laneId }))
    .then(lane => {
      lane.update({ notes: lane.notes.filter(note => note.id !== req.params.noteId) }, (error, respond) => {
        if (error) {
          respond.status(500).send(error);
        }
        respond.status(200).end();
      });
    });
  res.status(200).end();
}
