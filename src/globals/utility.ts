function errorCheck(error: unknown): error is Error {
  return error instanceof Error;
}

export { errorCheck };
