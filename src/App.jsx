import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import HeroLayout from './pages/HeroLayout.jsx';
import Hero from './pages/Hero.jsx';
import Topic from './pages/Topic.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cf-dark">
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hero/:handle" element={<HeroLayout />}>
              <Route index element={<Hero />} />
              <Route path="topic/:topic" element={<Topic />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
