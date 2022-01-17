const NotesTableTestHelper = require('../../../../tests/NotesTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewNote = require('../../../Domains/notes/entities/NewNote');
const AddedNote = require('../../../Domains/notes/entities/AddedNote');
const pool = require('../../database/postgres/pool');
const NoteRepositoryPostgres = require('../NoteRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('NoteRepositoryPostgres', () => {
  afterEach(async () => {
    await NotesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addNote function', () => {
    it('should create new note and return added note correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeNoteIdGenerator = (x = 10) => '123';
      function fakeDateGenerator() {
        this.toISOString = () => '2021';
      }

      const newNote = new NewNote({
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
        owner: 'user-123',
      });

      const noteRepositoryPostgres = new NoteRepositoryPostgres(
        pool, fakeNoteIdGenerator, fakeDateGenerator,
      );

      // Action
      const addedNote = await noteRepositoryPostgres.addNote(newNote);

      // Assert
      const notes = await NotesTableTestHelper.findNotesById(addedNote.id);
      expect(addedNote).toStrictEqual(new AddedNote({
        id: `note-${fakeNoteIdGenerator()}`,
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
        owner: 'user-123',
      }));
      expect(notes).toBeDefined();
    });
  });

  describe('getNoteById function', () => {
    it('should return NotFoundError when note is not found', async () => {
      // Arrange
      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await NotesTableTestHelper.addNote({ id: 'note-123', owner: 'user-123' });

      // Action and Assert
      await expect(noteRepositoryPostgres.getNoteById('note-x'))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should return note when is found', async () => {
      // Arrange
      const newNote = {
        id: 'note-123',
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
        date: '2021',
        username: 'dicoding',
      };

      const expectedNote = {
        id: 'note-123',
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
        date: '2021',
        username: 'dicoding',
      };

      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await NotesTableTestHelper.addNote(newNote);

      // Action
      const getNote = await noteRepositoryPostgres.getNoteById('note-123');

      // Assert
      expect(getNote).toStrictEqual(expectedNote);
    });
  });

  describe('getNotes function', () => {
    it('should return note when is found', async () => {
      // Arrange
      const newNote = {
        id: 'note-123',
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
        date: '2021',
        username: 'dicoding',
      };

      const expectedNotes = [{
        id: 'note-123',
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
        date: '2021',
        username: 'dicoding',
      }];

      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await NotesTableTestHelper.addNote(newNote);

      // Action
      const notes = await noteRepositoryPostgres.getNotes();

      // Assert
      expect(notes).toEqual(expectedNotes);
    });
  });
});
