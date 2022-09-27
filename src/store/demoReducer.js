import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 这里不需要trycatch 否则extraReducers里捕获不到rejected状态
const getDemoData = createAsyncThunk("demo/getData", async (content = "11") => {
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
  initialState: {
    content: "默认数据",
  },
  reducers: {},
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
