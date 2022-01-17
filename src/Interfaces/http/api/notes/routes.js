const routes = (handler) => ([
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
    options: {
      auth: 'walletapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes/{noteId}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
]);

module.exports = routes;
