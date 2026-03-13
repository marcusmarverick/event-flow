import api from './api';

/**
 * GET /events
 * @returns {{ events: Array }}
 */
export async function listEvents() {
  const response = await api.get('/events');
  return response.data;
}

/**
 * POST /events (multipart/form-data)
 * @param {FormData} formData
 * @returns {{ event: object }}
 */
export async function createEvent(formData) {
  const response = await api.post('/events', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
