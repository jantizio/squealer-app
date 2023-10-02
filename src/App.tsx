import Homepage from '@/components/Homepage';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Settings from '@/components/Settings';
import NewSqueal from '@/components/NewSqueal';
import Discover from '@/components/Discover';
import Channel from '@/components/Channel';
import Missing from '@/components/Missing';
import Layout from '@/components/Layout';
import RequireAuth from '@/components/RequireAuth';
import Unauthorized from '@/components/Unauthorized';
import PersistLogin from '@/components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<Homepage />} />

        <Route path="channels" element={<Discover />} />
        <Route path="channels/:channelName" element={<Channel />} />

        {/* private routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={['standard', 'professional', 'moderator']}
              loginPath="/login"
              unauthorizedPath="/unauthorized"
            />
          }
        >
          <Route path="settings" element={<Settings />} />
          <Route path="create" element={<NewSqueal />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
