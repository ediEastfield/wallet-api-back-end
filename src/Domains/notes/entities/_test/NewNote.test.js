const NewNote = require('../NewNote');

describe('a NewNote entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      description: 'makan siang',
    };

    // Action and Assert
    expect(() => new NewNote(payload)).toThrowError('NEW_NOTE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      category: 123,
      description: true,
      nominal: '1000',
      owner: [],
    };

    // Action and Assert
    expect(() => new NewNote(payload)).toThrowError('NEW_NOTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newNote object correctly', () => {
    // Arrange
    const payload = {
      category: 'expenses',
      description: 'makan siang',
      nominal: 10000,
      owner: 'user-123',
    };

    // Action
    const newNote = new NewNote(payload);

    // Assert
    expect(newNote).toBeInstanceOf(NewNote);
    expect(newNote.category).toEqual(payload.category);
    expect(newNote.description).toEqual(payload.description);
    expect(newNote.nominal).toEqual(payload.nominal);
    expect(newNote.owner).toEqual(payload.owner);
  });
});
