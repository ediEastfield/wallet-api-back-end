const DetailNote = require('../../../Domains/notes/entities/DetailNote');
const NoteRepository = require('../../../Domains/notes/NoteRepository');
const GetNotesUseCase = require('../GetNotesUseCase');

describe('GetNotesUseCase', () => {
  it('should orchestrate the get note action correctly', async () => {
    // Arrange
    const expectedNotes = [
      new DetailNote({
        id: 'note-123',
        category: 'expenses',
        description: 'makan siang',
        date: '2021',
        nominal: 10000,
        username: 'dicoding',
      }),
      new DetailNote({
        id: 'note-456',
        category: 'expenses',
        description: 'makan malam',
        date: '2021',
        nominal: 15000,
        username: 'dicoding',
      }),
    ];

    /** creating deendency of use case */
    const mockNoteRepository = new NoteRepository();

    /** mocking needed function */
    mockNoteRepository.getNotes = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedNotes));

    /** creating use case instance */
    const getNoteUseCase = new GetNotesUseCase({
      noteRepository: mockNoteRepository,
    });

    // Action
    const notes = await getNoteUseCase.execute();

    // Assert
    expect(notes).toEqual(expectedNotes);
  });
});
