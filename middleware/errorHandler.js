export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred.",
  });
}
