/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 这里不需要trycatch 否则extraReducers里捕获不到rejected状态
const getDemoData = createAsyncThunk("demo/getData", async (content: string) => {
  // try {
  // } catch (error) {
  //   return null;
  // }
  const res = await axios.post("/api/getDemoData", {
    content,
  });
  return res.data?.data?.content;
});

const demoReducer = createSlice({
  name: "demo",
  initialState: typeof window !== "undefined" ? ((window as any)?.context?.state?.demo) : {
    content: "默认数据",
  },
  // 同步reducer
  reducers: {},
  // 异步reducer
  extraReducers(build) {
    build
      .addCase(getDemoData.pending, (state, _) => {
        state.content = "pending";
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(getDemoData.rejected, (state, _) => {
        state.content = "rejected";
      });
  },
});

export { demoReducer, getDemoData };
