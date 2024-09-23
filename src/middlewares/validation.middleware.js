import { body, validationResult } from "express-validator";

const validationCheck = async (req, res, next) => {
  // Define validation rules
  const rules = [
    // Ensure the 'name' field is not empty
    body("name").notEmpty().withMessage("Name is required."),

    // Validate that 'price' is a positive float
    body("price").isFloat({
      gt: 0
    }).withMessage('Price should be a positive value'),

    // Custom validation for file upload
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required!")
      }
    })
  ];

  // Run all validation rules asynchronously
  await Promise.all(rules.map(rule => rule.run(req)));

  // Check for validation errors
  const validationErrors = validationResult(req)

  // If there are validation errors, render the 'new-product' view with the first error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", { errorMessage: validationErrors.array()[0].msg })
  }

  // If no errors, proceed to the next middleware
  next();
};

export default validationCheck;