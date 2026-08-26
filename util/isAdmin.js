export default function checkAdmin(role) {
  if (role !== "admin") {
    const error = new Error();
    error.errorCode = "UNAUTHORIZED";
    error.statusCode = 403;
    throw error;
  }
  return true;
}
