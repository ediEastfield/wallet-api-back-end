/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    category: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'TEXT',
      notNull: true,
    },
    nominal: {
      type: 'INTEGER',
      notNull: true,
      default: 0,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');
  pgm.dropTable('notes');
};
