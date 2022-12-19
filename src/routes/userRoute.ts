import express from "express";
import authController from "../controllers/authController";
import RESTController from "../controllers/RESTController";
import dataValidation from "../middlewares/validator";
import passport from "passport";
import initialize from "../middlewares/tokenAuth";

const router = express.Router();
initialize()


/* auth */

// posts a new user with register
router.post("/register", dataValidation, authController.register);

// posts a new session with login
router.post("/login", authController.login);

// deletes a session
router.delete("/logout", authController.logout);

/* RESTapi */

router.get("/", passport.authenticate("bearer", {session: false}), RESTController.getUsers);

export default router;