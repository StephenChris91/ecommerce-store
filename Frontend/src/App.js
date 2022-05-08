import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container } from 'react-bootstrap';

//routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//screens
import HomeScreen from './Screens/HomeScreen';
import Cart from './Screens/Cart';
import ProductScreen from './Screens/ProductScreen';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header />
      <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="cart" element={<Cart />}>
                <Route path=":id" element={<Cart />} />
              </Route>
              <Route path="/product/:id" element={<ProductScreen />} />
            </Routes>
          </Container>
          <Footer />
      </main>
    </Router>
  );
}

export default App;
