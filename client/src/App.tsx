import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import "./assets/style.css";
import React from "react";

function App(): JSX.Element {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/add' element={<AddBook />} />
          <Route path='/update/:id' element={<UpdateBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
