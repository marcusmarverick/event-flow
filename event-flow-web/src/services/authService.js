import api from './api';

/**
 * POST /auth/login
 * @param {{ email: string, password: string }} data
 * @returns {{ user, token: { value: string } }}
 */
export async function login(data) {
  const response = await api.post('/auth/login', data);
  return response.data;
}

/**
 * POST /auth/register
 * @param {{ type: 'participant'|'organizer', name: string, email: string, password: string, cpf?: string }} data
 * cpf deve ser enviado sem máscara (11 dígitos)
 * @returns {{ user, token: { value: string } }}
 */
export async function register(data) {
  const response = await api.post('/auth/register', data);
  return response.data;
}
