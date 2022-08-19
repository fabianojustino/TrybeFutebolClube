import Joi = require("joi");
import { IAuthService } from "../interfaces/IAuth.User.Service";
import msgSchema from "../helpers/schemas"

export default function validateLogin(params:IAuthService) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages(msgSchema.requiredEmailPassword),
    password: Joi.string().min(6).required(),
  })

  const { error, value } = schema.validate(params);

  if (error) throw error
    
  return value; 
}