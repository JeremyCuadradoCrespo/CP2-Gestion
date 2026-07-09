import { Router } from "express";
import {
  getContacts,
  getContactById,
  createContact,
  deleteContact
} from "../controllers/contactController.js";

const router = Router();

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.delete("/:id", deleteContact);

export default router;
