import './App.css';
import Footer from './components/Footer';
import Instructions from './components/Instructions';
import ScanImage from './components/ScanImage'

function App() {
  return (
    <>
      <div className='min-h-screen flex flex-wrap'>
        <h1 className="mx-auto my-14 text1 text-7xl text-center font-thin">¡Mandámelo por QR!</h1>
        <div className=' container mx-auto h-full flex flex-col align-center justify-center'>
          <ScanImage></ScanImage>
          <Instructions />
        </div>
      </div>
      
      <Footer></Footer>

    </>
    
  );
}

export default App;
