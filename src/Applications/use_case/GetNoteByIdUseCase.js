class GetNoteByIdUseCase {
  constructor({
    noteRepository,
  }) {
    this._noteRepository = noteRepository;
  }

  async execute(useCaseParams) {
    const { noteId } = useCaseParams;
    const detailNote = await this._noteRepository.getNoteById(noteId);

    return detailNote;
  }
}

module.exports = GetNoteByIdUseCase;
