const AddedNote = require('../AddedNote');

describe('a AddedNote entities', () => {
  it('should thrw when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'note-123',
      description: 'makan siang',
    };

    // Action and Assert
    expect(() => new AddedNote(payload)).toThrowError('ADDED_NOTE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meetdata type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      category: true,
      description: {},
      nominal: '10000',
      owner: [],
    };

    // Action and Assert
    expect(() => new AddedNote(payload)).toThrowError('ADDED_NOTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedNote object correctly', () => {
    // Arrange
    const payload = {
      id: 'note-123',
      category: 'expenses',
      description: 'makan siang',
      nominal: 10000,
      owner: 'user-123',
    };

    // Action
    const addedNote = new AddedNote(payload);

    // Assert
    expect(addedNote.id).toEqual(payload.id);
    expect(addedNote.category).toEqual(payload.category);
    expect(addedNote.description).toEqual(payload.description);
    expect(addedNote.nominal).toEqual(payload.nominal);
    expect(addedNote.owner).toEqual(payload.owner);
  });
});
