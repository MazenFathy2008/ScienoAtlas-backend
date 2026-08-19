export default function signOutController(req, res, next) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "User is signed out",
    });
  } catch (err) {
    next(err);
  }
}
