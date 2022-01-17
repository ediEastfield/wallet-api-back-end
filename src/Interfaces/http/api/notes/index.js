const NotesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'notes',
  register: async (server, { container }) => {
    const notesHandler = new NotesHandler(container);
    server.route(routes(notesHandler));
  },
};
