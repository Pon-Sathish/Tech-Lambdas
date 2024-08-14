import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login_Form from './Components/Login/login';
import Purchase_Page from './Components/Purchase/purchase';
import New_Login from './Components/Newlogin/newlogin';
import Add_Product from './Components/AddProduct/addproduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login_Form />}></Route>
          <Route path='/Purchase_Page' element={<Purchase_Page />}></Route>
          <Route path='/New_Login' element={<New_Login />}></Route>
          <Route path='/Add_Product' element={<Add_Product />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
