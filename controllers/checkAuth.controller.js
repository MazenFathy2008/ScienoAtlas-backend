import verifyToken from "../util/verfiy-token.js";

export default async function checkAuthController(req, res, next) {
  try {
    const token = req.cookies.token;
    const user = await verifyToken(token);
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      data: {
        ...user._doc,
        _id: null,
        password: null,
      },
    });
  } catch (err) {
    next(err);
  }
}
