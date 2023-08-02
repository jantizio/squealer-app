import Homepage from '@/components/Homepage';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Settings from '@/components/Settings';
import NewSqueal from '@/components/NewSqueal';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/create" element={<NewSqueal />} />
    </Routes>
  );
}

export default App;
