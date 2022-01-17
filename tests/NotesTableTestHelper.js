/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const NotesTableTestHelper = {
  async addNote({
    id = 'notes-123',
    category = 'expenses',
    description = 'makan siang',
    date = '2021',
    nominal = 50000,
    owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, category, description, date, nominal, owner],
    };

    await pool.query(query);
  },

  async findNotesById(id) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM notes WHERE 1=1');
  },
};

module.exports = NotesTableTestHelper;
