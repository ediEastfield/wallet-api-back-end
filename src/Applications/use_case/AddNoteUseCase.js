const NewNote = require('../../Domains/notes/entities/NewNote');

class AddNoteUseCase {
  constructor({ noteRepository }) {
    this._noteRepository = noteRepository;
  }

  async execute(useCasePayload, owner) {
    const newNote = new NewNote({ ...useCasePayload, owner });
    return this._noteRepository.addNote(newNote);
  }
}

module.exports = AddNoteUseCase;
