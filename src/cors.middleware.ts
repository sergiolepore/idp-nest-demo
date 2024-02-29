// Standard Express middleware to allow CORS requests
// We could even install them via npm and use them in Nest - Compatible API
export function CorsMiddleware(req, res, next) {
  console.log('Executing CORS middleware...');

  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
}
