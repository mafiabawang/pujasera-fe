import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Users from './pages/Users';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="d-flex">
          <Sidebar />
          <div className="p-3 w-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<UserAdd />} />
              <Route path="/users/:id" element={<UserEdit />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
