const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

async function parseBody(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function fetchPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);
  const body = await parseBody(response);

  if (!response.ok) {
    const error = new Error(body?.message || 'Request failed');
    error.status = response.status;
    error.payload = body;
    throw error;
  }

  return body;
}
