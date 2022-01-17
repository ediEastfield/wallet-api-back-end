const NewNote = require('../../../Domains/notes/entities/NewNote');
const AddedNote = require('../../../Domains/notes/entities/AddedNote');
const NoteRepository = require('../../../Domains/notes/NoteRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const AddNoteUseCase = require('../AddNoteUseCase');

describe('AddNoteUseCase', () => {
  it('should orchestrating the add note action correctly', async () => {
    // Arrange
    const useCasePayload = {
      category: 'expenses',
      description: 'makan siang',
      date: '2021',
      nominal: 10000,
    };

    const expectedAddedNote = new AddedNote({
      id: 'note-123',
      category: 'expenses',
      description: 'makan siang',
      nominal: 10000,
      owner: 'user-123',
    });

    /** creating dependency of use case */
    const mockNoteRepository = new NoteRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    /** mocking needed function */
    mockNoteRepository.addNote = jest.fn()
      .mockImplementation(() => Promise.resolve(
        expectedAddedNote,
      ));

    /** creating use case instance */
    const addNoteUseCase = new AddNoteUseCase({
      noteRepository: mockNoteRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const addedNote = await addNoteUseCase.execute(useCasePayload, 'user-123');

    // Assert
    expect(addedNote).toStrictEqual(new AddedNote({
      id: expectedAddedNote.id,
      category: expectedAddedNote.category,
      description: expectedAddedNote.description,
      nominal: expectedAddedNote.nominal,
      owner: expectedAddedNote.owner,
    }));

    expect(mockNoteRepository.addNote).toBeCalledWith(new NewNote({
      category: useCasePayload.category,
      description: useCasePayload.description,
      nominal: useCasePayload.nominal,
      owner: expectedAddedNote.owner,
    }));
  });
});
