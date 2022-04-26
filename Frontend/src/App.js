import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container } from 'react-bootstrap';

//routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//screens
import HomeScreen from './Screens/HomeScreen';
import Shop from './Screens/Shop';
import Cart from './Screens/Cart';
import ProductScreen from './Screens/ProductScreen';
import Login from './Screens/Login';

function App() {
  return (
    <Router>
      <Header />
      <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
          <Footer />
      </main>
    </Router>
  );
}

export default App;
