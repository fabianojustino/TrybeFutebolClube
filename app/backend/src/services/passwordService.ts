import  * as bcript from "bcryptjs";

export const passwordService = {
  encryptPassword: (password: string): string => {
    const salt = bcript.genSaltSync(5);
    const encryptedPassword = bcript.hashSync(password, salt);
    return encryptedPassword;
  },
  checkPassword: ({password , passwordDb}: any)=> {   
    
    const isMatch =  bcript.compareSync(password, passwordDb);     
  
    if (!isMatch) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }
  },
};
