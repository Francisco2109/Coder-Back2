import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import { passportCall } from "../middlewares/passport/passport-call.js";
import { verifyRole } from "../middlewares/verify-role.js";

const router = Router();

router.post("/register", sessionsController.register);
router.post("/login", sessionsController.login);
router.get("/current", sessionsController.current);
router.get("/unprotectedLogin", sessionsController.unprotectedLogin);
router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

router.get(
  "/private-headers",
  passportCall("jwt", { session: false }),
  verifyRole("USER"),
  (req, res) => res.json({ user: req.user })
);

router.get(
  "/private-headers-admin",
  passportCall("jwt", { session: false }),
  verifyRole("ADMIN"),
  (req, res) => res.json({ user: req.user })
);

router.get(
  "/private-cookies",
  passportCall("jwtCookies", { session: false }),
  verifyRole("USER"),
  (req, res) => res.json({ user: req.user })
);

router.get(
  "/private-cookies-admin",
  passportCall("jwtCookies", { session: false }),
  verifyRole("ADMIN"),
  (req, res) => res.json({ user: req.user })
);

export default router;
