export let successResponse = ({ res, message, result = [], statusCode }) => {
  console.log(result)
  res.status(statusCode).json({
    success: true,
    message,
    result,
  });
};
