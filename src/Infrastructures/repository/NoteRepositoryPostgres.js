const NoteRepository = require('../../Domains/notes/NoteRepository');
const AddedNote = require('../../Domains/notes/entities/AddedNote');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class NoteRepositoryPostgres extends NoteRepository {
  constructor(pool, idGenerator, dateGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
    this._dateGenerator = dateGenerator;
  }

  async addNote(newNote) {
    const {
      category, description, nominal, owner,
    } = newNote;
    const id = `note-${this._idGenerator(10)}`;
    const date = new this._dateGenerator().toISOString();
    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id, category, description, nominal, owner',
      values: [id, category, description, date, nominal, owner],
    };

    const result = await this._pool.query(query);
    return new AddedNote({ ...result.rows[0] });
  }

  async getNoteById(id) {
    const query = {
      text: `SELECT 
          notes.id, category, description, date, nominal, username
          FROM notes
          LEFT JOIN users ON users.id = notes.owner
          WHERE notes.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('note yang anda cari tidak ditemukan');
    }

    return result.rows[0];
  }

  async getNotes() {
    const query = {
      text: `SELECT
          notes.id, category, description, date, nominal, username
          FROM notes
          LEFT JOIN users ON users.id = notes.owner`,
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = NoteRepositoryPostgres;
