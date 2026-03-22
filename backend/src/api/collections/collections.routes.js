import { Router } from "express";
// import { create, getTree, remove } from './collections.controller.js';
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = Router();
router.use(requireAuth);

// router.post('/', create);
// router.get('/', getTree);
// router.delete('/:id', remove);

export default router;
