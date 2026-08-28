import Contact from "../../models/contactUs.model.js";
import Paper from "../../models/papers.models.js";
import User from "../../models/user.model.js";
import checkAdmin from "../../util/isAdmin.js";
import verifyToken from "../../util/verfiy-token.js";
export default async function getStatistics(req, res, next) {
  try {
    const token = req.cookies.token;
    const user = await verifyToken(token);
    const isAdmin = checkAdmin(user.role);
    if (isAdmin) {
      const [admins, normalUsers] = await Promise.all([
        User.countDocuments({ role: "admin" }),
        User.countDocuments({ role: "user" }),
      ]);
      const [pending, approved, rejected] = await Promise.all([
        Paper.countDocuments({ state: "pending" }),
        Paper.countDocuments({ state: "approved" }),
        Paper.countDocuments({ state: "rejected" }),
      ]);
      const [waiting, resolved] = await Promise.all([
        Contact.countDocuments({ status: "waiting" }),
        Contact.countDocuments({ status: "resolved" }),
      ]);
      res.json({
        users: {
          total: admins + normalUsers,
          admins,
          normalUsers,
        },
        papers: {
          pending,
          approved,
          rejected,
        },
        contacts: {
          received: waiting + resolved,
          resolved,
          waiting,
        },
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
