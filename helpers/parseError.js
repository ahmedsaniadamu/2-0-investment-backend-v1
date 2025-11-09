
export const parseError = (status, message, next) => {
   const error = new Error( message || "Something went wrong");
      error.statusCode = status || 500;
      return next(error);
};