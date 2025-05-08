import { useSession } from "next-auth/react";

export const useCurrentTokenUser = () => {
  const session = useSession();

  return session.data?.accessToken;
};