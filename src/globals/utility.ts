import axios from 'axios';

function errorCheck(error: unknown): error is Error {
  return error instanceof Error;
}

const backendApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // headers: { Authorization: authHeader() },
});

type op = 'viewed' | 'upvote' | 'downvote';
function updateSqueal(operation: op, id: number) {
  // TODO: response and error handling
  backendApi.patch(`/squeals/${id}`, { op: operation });
}

export { errorCheck, backendApi, updateSqueal };
