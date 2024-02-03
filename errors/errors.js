class ServerError extends Error {
  constructor(action) {
    super(`Internal server error - could not ${action} supply`);
    this.name = "ServerError";
    this.status = 500;
  }
}

class NotFoundError extends Error {
    constructor(entity) {
        super(`${entity} not found`);
        this.name = "NotFoundError";
        this.status = 404;
    }
}

class BadRequestError extends Error {
    constructor(element) {
        super(`Please provide a valid: ${element}`);
        this.name = "BadRequestError";
        this.status = 400;
    }
}

module.exports = {
    ServerError,
    NotFoundError,
    BadRequestError,
};