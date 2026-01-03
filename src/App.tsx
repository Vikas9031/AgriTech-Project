import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import CropGuide from './components/CropGuide';
import Weather from './components/Weather';
import Recommendations from './components/Recommendations';
import Forum from './components/Forum';

type Page = 'home' | 'crops' | 'weather' | 'recommendations' | 'forum';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'crops':
        return <CropGuide />;
      case 'weather':
        return <Weather />;
      case 'recommendations':
        return <Recommendations />;
      case 'forum':
        return <Forum />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
