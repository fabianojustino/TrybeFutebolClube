import  * as bcript from "bcryptjs";

export const passwordService = {
  encryptPassword: (password: string) => {
    const salt = bcript.genSaltSync(5);
    const encryptedPassword = bcript.hashSync(password, salt);
    return encryptedPassword;
  },
  checkPassword: ({password , passwordDb}: any)=> {
    const isMatch = bcript.compare(password, passwordDb);    
  
    if (!isMatch) {
      const e = new Error('Usuário não existe ou senha inválida');
      e.name = 'UnauthorizedError';
      throw e;
    }
  },
};
