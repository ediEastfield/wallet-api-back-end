const DetailNote = require('../DetailNote');

describe('a DetailNote entities', () => {
  it('should throw when payload did not contain property', () => {
    // Arrange
    const payload = {
      id: 'note-123',
      category: 'expenses',
      date: '2021',
      nominal: 10000,
      username: 'dicoding',
    };

    // Action and Assert
    expect(() => new DetailNote(payload)).toThrowError('DETAIL_NOTE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      category: true,
      description: {},
      date: 2021,
      nominal: '10000',
      username: [],
    };

    // Action and Assert
    expect(() => new DetailNote(payload)).toThrowError('DETAIL_NOTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should show detailNote object correctly', () => {
    // Arrange
    const payload = {
      id: 'note-123',
      category: 'expenses',
      description: 'makan siang',
      date: '2021',
      nominal: 10000,
      username: 'dicoding',
    };

    // Action
    const detailNote = new DetailNote(payload);

    // Assert
    expect(detailNote.id).toEqual(payload.id);
    expect(detailNote.category).toEqual(payload.category);
    expect(detailNote.description).toEqual(payload.description);
    expect(detailNote.date).toEqual(payload.date);
    expect(detailNote.nominal).toEqual(payload.nominal);
    expect(detailNote.username).toEqual(payload.username);
  });
});
