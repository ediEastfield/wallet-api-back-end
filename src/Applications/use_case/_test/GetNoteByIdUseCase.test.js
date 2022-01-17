const DetailNote = require('../../../Domains/notes/entities/DetailNote');
const NoteRepository = require('../../../Domains/notes/NoteRepository');
const GetNoteByIdUseCase = require('../GetNoteByIdUseCase');

describe('GetNoteByIdUseCase', () => {
  it('should orchestrate the get note by id action correctly', async () => {
    // Arrange
    const useCaseParams = {
      noteId: 'note-123',
    };

    const expectedDetailNote = new DetailNote({
      id: 'note-123',
      category: 'expenses',
      description: 'makan siang',
      date: '2021',
      nominal: 10000,
      username: 'dicoding',
    });

    /** creating dependency of use case */
    const mockNoteRepository = new NoteRepository();

    /** mocking needed function */
    mockNoteRepository.getNoteById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDetailNote));

    /** creating use case instance */
    const getNoteByIdUseCase = new GetNoteByIdUseCase({
      noteRepository: mockNoteRepository,
    });

    // Action
    const detailNote = await getNoteByIdUseCase.execute(useCaseParams);

    // Assert
    expect(detailNote).toEqual(new DetailNote(
      expectedDetailNote,
    ));
  });
});
