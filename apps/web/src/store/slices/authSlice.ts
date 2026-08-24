import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;

      state.refreshToken =
        action.payload.refreshToken ?? null;

      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "accessToken",
          action.payload.accessToken
        );

        if (action.payload.refreshToken) {
          localStorage.setItem(
            "refreshToken",
            action.payload.refreshToken
          );
        }

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    logout: (state) => {
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

    restoreAuth: (state) => {
      if (typeof window === "undefined") {
        return;
      }

      const accessToken =
        localStorage.getItem("accessToken");

      const refreshToken =
        localStorage.getItem("refreshToken");

      const user =
        localStorage.getItem("user");

      if (accessToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;

        if (user) {
          try {
            state.user = JSON.parse(user);
          } catch {
            state.user = null;
          }
        }
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  restoreAuth,
} = authSlice.actions;

export default authSlice.reducer;