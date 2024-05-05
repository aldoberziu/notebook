import { createSlice, configureStore } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: { notes: [] },
  reducers: {
    addNotes(state, action) {
      state.notes = action.payload;
    },
    addNote(state, action) {
      state.notes = [...state.notes, action.payload];
    },
    editNote(state, action) {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.editingNoteID ? { ...note, ...action.payload.note } : note
      );
    },
    deleteNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});
const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: [] },
  reducers: {
    addCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories = [...state.categories, action.payload];
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
  },
});
const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});
export const notesActions = notesSlice.actions;
export const categoriesActions = categoriesSlice.actions;

export default store;
