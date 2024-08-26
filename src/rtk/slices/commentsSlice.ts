import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "../../types/commentType";
import deffaultData from "../../data/data.json";

const initialState: { comments: CommentType[] } = {
  comments: localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments")!)
    : deffaultData.comments,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload) {
          return { ...comment, score: comment.score + 1 };
        }
        comment.replies = comment.replies?.map((reply) =>
          reply.id === action.payload
            ? { ...reply, score: reply.score + 1 }
            : reply
        );
        return comment;
      });
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },

    removeScore: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload) {
          return { ...comment, score: comment.score - 1 };
        }
        comment.replies = comment.replies?.map((reply) =>
          reply.id === action.payload
            ? { ...reply, score: reply.score - 1 }
            : reply
        );
        return comment;
      });
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },

    addComment: (state, action: PayloadAction<CommentType>) => {
      state.comments.push(action.payload);
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },

    addReply: (
      state,
      action: PayloadAction<{ id: number; reply: CommentType }>
    ) => {
      state.comments = state.comments.map((comment) =>
        comment.id === action.payload.id
          ? {
              ...comment,
              replies: [...(comment.replies || []), action.payload.reply],
            }
          : comment
      );
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },

    removeComRep: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => {
        if (comment.id === action.payload) return false;
        comment.replies = comment.replies?.filter(
          (reply) => reply.id !== action.payload
        );
        return true;
      });
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },

    editComRep: (
      state,
      action: PayloadAction<{ id: number; text: string }>
    ) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return { ...comment, content: action.payload.text };
        }
        comment.replies = comment.replies?.map((reply) =>
          reply.id === action.payload.id
            ? { ...reply, content: action.payload.text }
            : reply
        );
        return comment;
      });
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
  },
});

export default commentsSlice.reducer;

export const {
  addScore,
  editComRep,
  removeScore,
  addComment,
  addReply,
  removeComRep,
} = commentsSlice.actions;
