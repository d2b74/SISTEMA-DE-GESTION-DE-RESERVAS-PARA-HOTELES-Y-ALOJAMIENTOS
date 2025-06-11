import { Router } from "express";
import { Checkout } from "../Controllers/checkoutController.js";

const checkoutRouter = Router();

checkoutRouter.get("/", Checkout.getCheckouts);
checkoutRouter.get("/:id", Checkout.getCheckoutById);
checkoutRouter.post("/", Checkout.createCheckout);
checkoutRouter.put("/:id", Checkout.updateCheckout);
checkoutRouter.delete("/:id", Checkout.deleteCheckout);

export default checkoutRouter;
