import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api/client";

const saved = (() => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  user: saved?.user || null,
  token: saved?.token || null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      // data = { msg, token, user }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    hydrateFromStorage(state) {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const { user, token } = JSON.parse(raw);
        state.user = user;
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s) => {
        s.status = "succeeded";
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error.message;
      })

      // login
      .addCase(loginUser.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload.user;
        s.token = a.payload.token;
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: s.user, token: s.token })
        );
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error.message;
      });
  },
});

export const { logout, hydrateFromStorage } = slice.actions;
export default slice.reducer;
