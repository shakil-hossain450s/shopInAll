import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from './Screens/ProductScreen';


function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">amazona</Link>
        </header>
        <main>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen></ProductScreen>}></Route>
            <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
