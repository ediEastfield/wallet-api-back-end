class NoteRepository {
  async addNote(newNote) {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getNotes() {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getNoteById(id) {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = NoteRepository;
