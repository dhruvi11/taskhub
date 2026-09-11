import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      state.refreshToken = action.payload.refreshToken || null;

      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);

        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },

    hydrateAuth: (state) => {
      if (typeof window === "undefined") {
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      const refreshToken = localStorage.getItem("refreshToken");

      const userString = localStorage.getItem("user");

      if (accessToken) {
        state.accessToken = accessToken;

        state.refreshToken = refreshToken;

        state.user = userString ? JSON.parse(userString) : null;

        state.isAuthenticated = true;
      }
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        localStorage.removeItem("user");
      }
    },
  },
});

export const { setCredentials, hydrateAuth, setUser, clearCredentials } =
  authSlice.actions;

export default authSlice.reducer;
