const msgSchema = {
  requiredEmailPassword: {
    'string.empty': 'All fields must be filled',
    'string.email': 'Incorrect email or password',
    'any.required': 'All fields must be filled',
  },
  defaultMsg: {
    'string.base': '"fields" must be a string',
    'string.empty': 'Some required fields are missing',
    'string.email': 'Incorrect email or password',
    'any.required': 'Some required fields are missing',
    'number.base': '"fields" must be a number',
    'array.min': '"productsIds" must include only numbers',
  },
};

export default msgSchema;
