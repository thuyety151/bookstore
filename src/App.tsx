import './App.css';
import Navbar from './components/header/Navbar'
import Header from './components/header/Header'
import Categories from './components/Categories'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Header/>
      <Categories />
    </div>
  );
}

export default App;
