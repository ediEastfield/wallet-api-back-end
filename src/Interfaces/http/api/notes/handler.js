const AddNoteUseCase = require('../../../../Applications/use_case/AddNoteUseCase');
const GetNoteByIdUseCase = require('../../../../Applications/use_case/GetNoteByIdUseCase');
const GetNotesUseCase = require('../../../../Applications/use_case/GetNotesUseCase');

class NotesHandler {
  constructor(container) {
    this._container = container;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const addNoteUseCase = this._container.getInstance(AddNoteUseCase.name);
    const addedNote = await addNoteUseCase.execute(request.payload, owner);

    const response = h.response({
      status: 'success',
      data: {
        addedNote,
      },
    });
    response.code(201);

    return response;
  }

  async getNoteByIdHandler(request, h) {
    const getNoteByIdUseCase = this._container.getInstance(GetNoteByIdUseCase.name);
    const detailNote = await getNoteByIdUseCase.execute(request.params);

    const response = h.response({
      status: 'success',
      data: {
        note: detailNote,
      },
    });

    return response;
  }

  async getNotesHandler() {
    const getNotesUseCase = this._container.getInstance(GetNotesUseCase.name);
    const notes = await getNotesUseCase.execute();

    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }
}

module.exports = NotesHandler;
