const msgSchema = {
  requiredEmailPassword: {
    'string.base': '"fields" must be a string', 
    'string.empty': 'All fields must be filled', 
    'any.required': 'All fields must be filled',
  },
  defaultMsg: {
    'string.base': '"fields" must be a string', 
    'string.empty': 'Some required fields are missing', 
    'any.required': 'Some required fields are missing',
  },
};

export default msgSchema;