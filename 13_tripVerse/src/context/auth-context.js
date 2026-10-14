import { createContext } from "react";

export const authContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export default authContext;
