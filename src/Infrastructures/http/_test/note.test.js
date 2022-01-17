const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotesTableTestHelper = require('../../../../tests/NotesTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ServersTestHelper = require('../../../../tests/ServersTestHalper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/notes endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await NotesTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('when POST /notes', () => {
    it('should response 201 and persisted note', async () => {
      // Arrange
      const requestPayload = {
        category: 'expenses',
        description: 'makan siang',
        nominal: 10000,
      };

      const server = await createServer(container);

      const { accessToken } = await ServersTestHelper.getAccessTokenAndUserIdHelper({ server });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/notes',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.addedNote).toBeDefined();
      expect(responseJson.data.addedNote.id).toBeDefined();
      expect(responseJson.data.addedNote.category).toBeDefined();
      expect(responseJson.data.addedNote.description).toBeDefined();
      expect(responseJson.data.addedNote.nominal).toBeDefined();
      expect(responseJson.data.addedNote.owner).toBeDefined();
    });

    it('should response with 400 when payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        cetegory: 'expenses',
      };

      const server = await createServer(container);

      const { accessToken } = await ServersTestHelper.getAccessTokenAndUserIdHelper({ server });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/notes',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat catatan baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        category: 123,
        description: {},
        nominal: '10000',
      };

      const server = await createServer(container);

      const { accessToken } = await ServersTestHelper.getAccessTokenAndUserIdHelper({ server });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/notes',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat catatan baru karena tipe data tidak sesuai');
    });
  });

  describe('when GET /notes/{noteId}', () => {
    it('should response with 200 detail note', async () => {
      // Arrange
      const server = await createServer(container);

      const noteId = 'note-123';
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
      await NotesTableTestHelper.addNote({ id: noteId, owner: 'user-123' });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/notes/${noteId}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.note).toBeDefined();
    });
  });

  describe('when GET /notes', () => {
    it('should response with 200 notes', async () => {
      // Arrange
      const server = await createServer(container);

      const noteId = 'note-123';
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
      await NotesTableTestHelper.addNote({ id: noteId, owner: 'user-123' });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/notes',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.notes).toBeDefined();
    });
  });
});
