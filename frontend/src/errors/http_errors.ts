class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * 401 Unauthorized
 */
export class UnAuthorizedError extends HttpError {}

/**
 * 409 Conflict
 */
export class ConflictError extends HttpError {}
