export function errorHandler(err, req, res, next) { // Define the error handling middleware.
  console.error(err); // Log the error to the console.
  res.status(500).json({ // Send a 500 response to the client.
    success: false, // Indicate the call failed.
    message: "An unexpected error occurred.", // Send a generic error message.
  });
}
