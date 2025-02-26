import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthContext } from './components/Auth/AuthContext';
import { useContext, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Cart/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './components/Update/Update';
import Admin from './components/Admin/Admin';
import AdminUpdate from './components/Admin/Update/AdminUpdate';
import AdminShop from './components/Admin/Shop/AdminShop';
import AdminFeatuedVideo from './components/Admin/FeaturedVideo/AdminFeaturedVideo';
import UpdateRole from './components/Admin/Roles/UpdateRole';
import UserList from './components/Admin/Roles/UserList';
import Lesson from './components/Lesson/Lesson';
import ViewLesson from './components/Lesson/ViewLesson';
import AdminLessons from './components/Admin/Lessons/Lessons';
import ViewAdminLesson from './components/Admin/Lessons/ViewLesson';
function App() {

  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser()
  },[loadUser]);


  return (
    <div className='App'>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path='/' element={< Home/>}/>
              <Route path='/login' element={< Login/>}/>
              <Route path='/signup' element={< Signup/>}/>
              <Route path='/shop' element={<Shop />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/lessons' element={<Lesson />} />
              <Route path='/lessons/:id' element={<ViewLesson />} />
              <Route path='/updates' element={<Update />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/update' element={<AdminUpdate />} />
              <Route path='/admin/shop' element={<AdminShop />} />
              <Route path='/admin/featured-video' element={<AdminFeatuedVideo />} />
              <Route path='/admin/update-role' element={<UserList />} />
              <Route path='/admin/lessons' element={<AdminLessons />} />
              <Route path='/admin/lessons/:id' element={< ViewAdminLesson/>} />
              <Route path='/admin/update-role/:id' element={<UpdateRole /> } />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
