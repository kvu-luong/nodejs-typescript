import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationResult } from 'joi';
const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const validateResult: ValidationResult = schema.validate({
    ...req.body,
    ...req.query,
    ...req.params,
  });
  if (validateResult.error) {
    res.status(400).json({
      error: validateResult.error.details[0]?.message,
    });
  } else {
    next();
  }
};

export default validate;
