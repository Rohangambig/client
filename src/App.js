import './App.css';
import Form from './scene/User/Form';
import Home from './scene/Home/index';
import SharedNews from './scene/News/sharedNews/Index'
import News from './scene/News/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form></Form>} />
        <Route path="/home" element={<News></News>} />
        <Route path="/news" element={<News></News>} />
        <Route path="/news/sharedPost/:postId" element={<SharedNews></SharedNews>} />
      </Routes>
    </Router>
  );
}

export default App;
