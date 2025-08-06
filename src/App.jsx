import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-grow flex items-center justify-center mt-10">
        <p className="text-gray-600">Main content goes here.</p>
      </main>
      
      <Footer />
    </div>
  );
}


export default App;
