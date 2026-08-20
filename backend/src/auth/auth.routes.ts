import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Google authentication successful",
      data: req.user,
    });
  }
);

export default router;