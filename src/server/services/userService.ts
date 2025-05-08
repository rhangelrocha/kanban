import { User } from '@/types/user';
import axios from 'axios';

export const userService = {
    authenticate,
};
  
async function authenticate(email: string, password: string) {
    // if(username !== "ti@ae.digital" && password !== "aK6wC8v_6KkdDSm3KrtyP_J1HlmP_4vezcfPejd") {
    //   return null;
    // }
  
    // const user = { 
    //   id: "0001",
    //   name: "AE Digital", 
    //   email: "ti@ae.gitial"
    // };
  
    // return user;

    try {
      const response = await axios.post<{ token: string; user: Array<User> }>(`${process.env.API_URL}/auth/login`, { email, password });
      // const user = response.data;
      const user = {
        ...response.data.user,
        token: response.data.token
      }
      
      return user;
    } catch (error) {
      // Se ocorrer um erro na autenticação (por exemplo, credenciais inválidas), retorne null
      console.error('Authentication failed', error);
      return null;
    }
}