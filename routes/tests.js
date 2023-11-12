const request = require('supertest');
const app = require('../index');

describe('GET /tasks', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});

describe('POST /tasks', () => {
  it('should create a new task', async () => {
    const taskData = {
      title: 'New Task',
      description: 'This is a new task.',
      priority: 1,
      status: 'pending',
    };

    const response = await request(app).post('/tasks').send(taskData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task added successfully');
  });
});

describe('POST /tasks', () => {
  it('should return error for missing title', async () => {
    const taskData = {
      description: 'This is a new task.',
      priority: 1,
      status: 'pending',
    };

    const response = await request(app).post('/tasks').send(taskData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title is a required fields');
  });
});

describe('PUT /tasks/:id', () => {
  it('should update an existing task', async () => {
    const taskId = 1; // Assuming there is a task with id 1
    const taskData = {
      title: 'Updated Task',
      description: 'This is an updated task.',
      priority: 2,
      status: 'in progress',
    };

    const response = await request(app).put(`/tasks/${taskId}`).send(taskData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task updated successfully');
  });
});

describe('DELETE /tasks/:id', () => {
  it('should delete an existing task', async () => {
    const taskId = 1; // Assuming there is a task with id 1

    const response = await request(app).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
  });
});