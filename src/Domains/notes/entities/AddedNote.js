class AddedNote {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, category, description, nominal, owner,
    } = payload;

    this.id = id;
    this.category = category;
    this.description = description;
    this.nominal = nominal;
    this.owner = owner;
  }

  _verifyPayload({
    id, category, description, nominal, owner,
  }) {
    if (!id || !category || !description || !nominal || !owner) {
      throw new Error('ADDED_NOTE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
        || typeof category !== 'string'
        || typeof description !== 'string'
        || typeof nominal !== 'number'
        || typeof owner !== 'string'
    ) {
      throw new Error('ADDED_NOTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedNote;
