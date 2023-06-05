const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  public name: string;
  public statusCode: number;
  public isOperational: boolean;
  public errorStack: any;
  public logError: any;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean,
    errorStack: any,
    logingErrorResponse: any
  ) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this, this.constructor);
  }
}

class APIError extends AppError {
    constructor(
      name: string,
      statusCode: number = STATUS_CODES.INTERNAL_ERROR,
      description: string = "Internal Server Error",
      isOperational: boolean = true,
      errorStack: null,
      logingErrorResponse: null
    ) {
      super(
         name,
         statusCode,
         description,
         isOperational,
         errorStack,
         logingErrorResponse
        );
    }
  }
  
  class NotFoundError extends AppError {
    constructor(description: string = "Not Found", logingErrorResponse: any) {
      super(
        "NOT FOUND",
        STATUS_CODES.NOT_FOUND,
        description,
        true,
        false,
        logingErrorResponse
      );
    }
  }
  
  class BadRequestError extends AppError {
    constructor(description: string = "Bad request", logingErrorResponse: any) {
      super(
        "BAD REQUEST",
        STATUS_CODES.BAD_REQUEST,
        description,
        true,
        false,
        logingErrorResponse
      );
    }
  }
  
  class ValidationError extends AppError {
    constructor(description: string = "Validation Error", errorStack: any, logingErrorResponse: null) {
      super(
        "BAD REQUEST",
        STATUS_CODES.BAD_REQUEST,
        description,
        true,
        errorStack,
        logingErrorResponse
      );
    }
  }


  export  {
    AppError,
    APIError,
    BadRequestError,
    NotFoundError,
    ValidationError,
    STATUS_CODES,
  }