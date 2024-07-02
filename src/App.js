import './App.css';
import Home from './screens/Home';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';


function App() {
  return (
    <CartProvider>

    <BrowserRouter>
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/createuser' element={<Signup />} />
        <Route exact path='/MyOrder' element={<MyOrder />} />
      </Routes>
    </div>
    
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
