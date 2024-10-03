import express from 'express'
import * as auth from './../controllers/auth.controller'

const router = express.Router();

router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.post("/signout", auth.logout);
router.post("/changePassword", auth.changePassword);

export default router;