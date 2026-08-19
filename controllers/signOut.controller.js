export default function signOutController(req, res, next) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User is signed out",
    });
  } catch (err) {
    next(err);
  }
}
