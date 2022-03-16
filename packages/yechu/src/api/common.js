const BASE_URL = 'http://localhost:3000/api';

export async function fetchData(resource, data, method) {
  try {
    const response = await fetch(BASE_URL + resource, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data && JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}
