import Paper from "../../models/papers.models.js";
import User from "../../models/user.model.js";
import checkAdmin from "../../util/isAdmin.js";
import verifyToken from "../../util/verfiy-token.js";

const getPapers = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await verifyToken(token);
    const isAdmin = checkAdmin(user.role);
    if (isAdmin) {
      const papers = await Paper.find();
      const publications = await Promise.all(
        papers.map(async (paper) => {
          const userId = paper.uploadedBy;
          const user = await User.findById(userId);
          return {
            paper,
            user: {
              email: user.email,
              name: user.name,
              id: user.id,
            },
          };
        }),
      );
      res.json({ publications });
    }
  } catch (err) {
    next(err);
  }
};
const updateState = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await verifyToken(token);
    const isAdmin = checkAdmin(user.role);
    if (isAdmin) {
      const { id } = req.params;
      const  {state}  = req.body;
      const paper = await Paper.findById(id);
      paper.state = state;
      await paper.save();
      res.json({paper});
    }
  } catch (err) {
    next(err);
  }
};
export { getPapers, updateState };
