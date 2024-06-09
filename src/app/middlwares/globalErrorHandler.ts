import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import TErrorSource from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];


  // aivabe ZodError theke error asce kina buja jai
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    console.log(simplifiedError);
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

//  error pattern
/*
success message
errorSources: [
path: '',
message: ''
]
stack
*/
