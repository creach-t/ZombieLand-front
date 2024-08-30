import underconstruction from '../../assets/underconstruction.webp';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

function App() {
  return (
    <div>
      <img className="m-auto" src={underconstruction} alt="underconstruction" />
      <NavBar />
      <img src={underconstruction} alt="underconstruction" />
      <Footer />
    </div>
  );
}

export default App;
