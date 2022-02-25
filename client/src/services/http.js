const baseUrl = 'https://fitlogger-dev.herokuapp.com/api/v1/';

const headers = {
  'Content-Type': 'application/json',
};

export const getMe = async token => {
  const res = await fetch(`${baseUrl}me`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return await res.json();
};

export const registerUser = async (name, email, password, confirmPassword) => {
  const res = await fetch(`${baseUrl}auth/register`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }),
  });

  return await res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${baseUrl}auth/login`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const response = await res.json();

  if (response.success) {
    localStorage.setItem('token', response.data);
  }

  return response;
};

export const getExercises = async token => {
  const res = await fetch(`${baseUrl}exercises`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return await res.json();
};

export const createExercise = async (exercise, token) => {
  const res = await fetch(`${baseUrl}exercise/create`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(exercise),
  });

  return await res.json();
};

export const getExercise = async (id, token) => {
  const res = await fetch(`${baseUrl}exercise/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return await res.json();
};

export const updateExercise = async (id, token, data) => {
  const res = await fetch(`${baseUrl}exercise/update/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({
      ...data,
    }),
  });

  return await res.json();
};

export const renameExercise = async (id, token, data) => {
  const res = await fetch(`${baseUrl}exercise/rename/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({
      ...data,
    }),
  });

  return await res.json();
};

export const deleteExercise = async (id, token) => {
  const res = await fetch(`${baseUrl}exercise/delete/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });

  return await res.json();
};

export const getRoutines = async token => {
  const res = await fetch(`${baseUrl}routines`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return await res.json();
};

export const getRoutine = async (id, token) => {
  const res = await fetch(`${baseUrl}routine/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  });

  return await res.json();
};

export const createRoutine = async (data, token) => {
  const res = await fetch(`${baseUrl}routine/create`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const renameRoutine = async (id, token, data) => {
  const res = await fetch(`${baseUrl}routine/rename/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({
      ...data,
    }),
  });

  return await res.json();
};

export const deleteRoutine = async (id, token) => {
  const res = await fetch(`${baseUrl}routine/delete/${id}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });

  return await res.json();
};

export const addExerciseToRoutine = async (data, token) => {
  const res = await fetch(`${baseUrl}routine/exercise/add`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  return await res.json();
};
