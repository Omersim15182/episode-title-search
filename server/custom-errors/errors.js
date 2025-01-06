export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}
