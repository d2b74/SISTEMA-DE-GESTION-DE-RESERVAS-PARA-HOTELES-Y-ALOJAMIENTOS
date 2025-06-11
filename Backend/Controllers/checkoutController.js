import { checkoutModel } from "../Models/checkoutModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  validateCheckout,
  validatePartialCheckout,
} from "../schemas/checkout.js";

export class checkoutController {
  static getCheckouts = async (req, res) => {
    const items = await checkoutModel.getCheckouts();
    res.status(200).json(items);
  };

  static getCheckoutById = async (req, res) => {
    const item = await checkoutModel.getCheckoutById(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Check-out no encontrado" });
    }
  };

  static createCheckout = async (req, res) => {
    const data = req.body.checkout;
    const parsed = validateCheckout(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const result = await checkoutModel.createCheckout(parsed.data);
    res.status(201).json(result);
  };

  static updateCheckout = async (req, res) => {
    const id = req.params.id;
    const data = req.body.checkout;
    const parsed = validatePartialCheckout(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const result = await checkoutModel.updateCheckout(id, parsed.data);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Check-out actualizado" });
    } else {
      res.status(404).json({ message: "Check-out no encontrado" });
    }
  };

  static deleteCheckout = async (req, res) => {
    const result = await checkoutModel.deleteCheckout(req.params.id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Check-out eliminado" });
    } else {
      res.status(404).json({ message: "Check-out no encontrado" });
    }
  };
}

export const Checkout = {
  getCheckouts: asyncHandler(checkoutController.getCheckouts),
  getCheckoutById: asyncHandler(checkoutController.getCheckoutById),
  createCheckout: asyncHandler(checkoutController.createCheckout),
  updateCheckout: asyncHandler(checkoutController.updateCheckout),
  deleteCheckout: asyncHandler(checkoutController.deleteCheckout),
};
