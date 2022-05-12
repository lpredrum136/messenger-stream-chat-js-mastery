import { createContext, ReactNode, useContext } from 'react';

interface IUserContext {
  fullName: string;
  avatarURL: string;
}

const defaultUserContext: IUserContext = { fullName: '', avatarURL: '' };

const UserContext = createContext<IUserContext>(defaultUserContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {};

export const useUserContext = useContext(UserContext);
