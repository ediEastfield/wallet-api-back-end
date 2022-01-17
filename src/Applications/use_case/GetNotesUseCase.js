class GetNotesUseCase {
  constructor({
    noteRepository,
  }) {
    this._noteRepository = noteRepository;
  }

  async execute() {
    const notes = await this._noteRepository.getNotes();

    return notes;
  }
}

module.exports = GetNotesUseCase;
