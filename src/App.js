import './App.css';
import Footer from './components/Footer';
import ScanImage from './components/ScanImage'

function App() {
  return (
    <>
      <div className='h-screen container mx-auto flex flex-col align-center justify-center'>
        <h1 className="mx-auto text1 text-7xl text-center font-thin">¡Mandámelo por QR!</h1>
        <ScanImage></ScanImage>
      </div>
      <Footer></Footer>

    </>
    
  );
}

export default App;
