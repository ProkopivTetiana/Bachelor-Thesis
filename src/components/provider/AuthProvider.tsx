import { type User } from "@prisma/client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "~/utils/api";

const AuthProviderContext = createContext<{
  activeUser: User | null | undefined;
  userId: string;
  error: string;
  getLoginUser: (email: string, password: string) => void;
  setActiveUserById: (user_id: string) => void;
}>({
  activeUser: null,
  userId: "",
  error: "",
  getLoginUser: () => true,
  setActiveUserById: () => true,
});

export const useAuthProvider = () => useContext(AuthProviderContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [activeUser, setActiveUser] = useState<User | null>();
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data: userById, isLoading: isLoadingUserById } =
    api.user.getUserById.useQuery(
      {
        user_id: userId,
      },
      {
        enabled: !!userId,
      },
    );

  const { mutate: loginUser } = api.user.loginUser.useMutation({
    onSuccess: async (data) => {
      setError("");
      setActiveUser(data);
      localStorage.setItem("userId", data.id);
    },
    onError: (e) => {
      console.log(e);
      setError(e.message);
    },
  });

  const setActiveUserById = useCallback((user_id: string) => {
    setUserId(user_id);
    // localStorage.setItem('userId', JSON.stringify(user_id));
    localStorage.setItem("userId", user_id);
  }, []);

  const getLoginUser = useCallback(
    (email: string, password: string) => {
      error && setError("");
      loginUser({ email, password });
    },
    [error, loginUser],
  );

  useEffect(() => {
    if (userById) {
      setActiveUser(userById);
    }
  }, [userById, isLoadingUserById]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const value = useMemo(
    () => ({
      activeUser: activeUser,
      userId: userId,
      error: error,
      getLoginUser: getLoginUser,
      setActiveUserById: setActiveUserById,
    }),
    [activeUser, userId, error, getLoginUser, setActiveUserById],
  );

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;
