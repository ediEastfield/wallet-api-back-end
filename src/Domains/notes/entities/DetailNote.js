class DetailNote {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, category, description, date, nominal, username,
    } = payload;

    this.id = id;
    this.category = category;
    this.description = description;
    this.date = date;
    this.nominal = nominal;
    this.username = username;
  }

  _verifyPayload({
    id, category, description, date, nominal, username,
  }) {
    if (!id || !category || !description || !date || !nominal || !username) {
      throw new Error('DETAIL_NOTE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
        || typeof category !== 'string'
        || typeof description !== 'string'
        || typeof date !== 'string'
        || typeof nominal !== 'number'
        || typeof username !== 'string'
    ) {
      throw new Error('DETAIL_NOTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = DetailNote;
