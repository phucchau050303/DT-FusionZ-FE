


import NavBar from './components/navigation/NavBar';
import Footer from './components/navigation/Footer';
import AppRouter from './router';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <section>
      <NavBar />
      <AppRouter />
      <Footer />
    </section>
  );
}

export default App;
