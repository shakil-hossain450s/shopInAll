import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from './Screens/ProductScreen';


function App() {
  return (
    <BrowserRouter>
      <Helmet><title>amazona</title></Helmet>
      <div className='flex flex-col h-screen'>
        <header>
          <Header></Header>
        </header>
        <main>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen></ProductScreen>}></Route>
            <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
          </Routes>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
