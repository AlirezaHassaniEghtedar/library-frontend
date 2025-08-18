import { Route, Routes } from "react-router";

import RootLayout from "./layouts/RootLayout/RootLayout.tsx";
import Books from "./pages/Books/Books.tsx";
import Book from "./pages/Book/Book.tsx";
import Add from "./pages/Add/Add.tsx";
import Update from "./pages/Update/Update.tsx";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
      </Route>
    </Routes>
  );
}

export default App;
