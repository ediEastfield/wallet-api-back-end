const NoteRepository = require('../NoteRepository');

describe('NoteRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Ararnge
    const noteRepository = new NoteRepository();

    // Action and assert
    await expect(noteRepository.addNote({})).rejects.toThrowError('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(noteRepository.getNotes()).rejects.toThrowError('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(noteRepository.getNoteById('')).rejects.toThrowError('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
