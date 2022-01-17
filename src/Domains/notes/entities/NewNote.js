class NewNote {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      category, description, nominal, owner,
    } = payload;

    this.category = category;
    this.description = description;
    this.nominal = nominal;
    this.owner = owner;
  }

  _verifyPayload({
    category, description, nominal, owner,
  }) {
    if (!category || !description || !nominal || !owner) {
      throw new Error('NEW_NOTE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof category !== 'string'
        || typeof description !== 'string'
        || typeof nominal !== 'number'
        || typeof owner !== 'string') {
      throw new Error('NEW_NOTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewNote;
