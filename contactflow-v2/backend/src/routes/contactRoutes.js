import { Router } from "express";
import {
  getContacts,
  getTrash,
  getContactById,
  createContact,
  updateContact,
  toggleFavorite,
  deleteContact,
  restoreContact,
  permanentlyDeleteContact,
  importContacts
} from "../controllers/contactController.js";

const router = Router();

router.get("/trash", getTrash);
router.get("/", getContacts);
router.post("/import", importContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", updateContact);
router.patch("/:id/favorito", toggleFavorite);
router.post("/:id/restaurar", restoreContact);
router.delete("/:id/permanente", permanentlyDeleteContact);
router.delete("/:id", deleteContact);

export default router;
