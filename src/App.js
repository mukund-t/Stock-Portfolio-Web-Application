import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Watchlist from './Watchlist';
import Portfolio from './Portfolio';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    

      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<><Header /><Home /></>}/>
            <Route path="/watchlist" element={<><Header /><Watchlist /></>}/>
            <Route path="/portfolio" element={<><Header /><Portfolio /></>}/>
          </Routes>
        </div>
      </BrowserRouter>

  );
}


export default App;
