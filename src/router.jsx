import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import MenuItemInfo from './pages/MenuItemInfo';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/item-info" element={<MenuItemInfo />} />
    </Routes>
  </Router>
);

export default AppRouter;
