import { body, validationResult } from "express-validator";

const validationCheck = async (req, res, next) => {
  //Rules
  const rules = [
    body("name").notEmpty().withMessage("Name is required."),
    body("price").isFloat({
      gt: 0
    }).withMessage('Price should be a positive value'),
    // body("imageUrl").isURL().withMessage("Invalid url"),
  ];

  //Rules run
  await Promise.all(rules.map(rule => rule.run(req)));

  //checks if errors
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.render("new-product", { errorMessage: validationErrors.array()[0].msg })
  }
  next();
};

export default validationCheck;