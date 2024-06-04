import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Users from './pages/Users';
import AddEditUser from './pages/AddEditUser';
import Pujasera from './pages/Pujasera';
import AddEditPujasera from './pages/AddEditPujasera';
import AddEditTenant from './pages/AddEditTenant';
import Tenants from './pages/Tenants';

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
              <Route path="/users/add" element={<AddEditUser />} />
              <Route path="/users/:id" element={<AddEditUser />} />
              <Route path="/pujasera" element={<Pujasera />} />
              <Route path="/pujasera/add" element={<AddEditPujasera />} />
              <Route path="/pujasera/:id" element={<AddEditPujasera />} />
              <Route path="/merchants" element={<Tenants />} />
              <Route path="/merchants/add" element={<AddEditTenant />} />
              <Route path="/merchants/:id" element={<AddEditTenant />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
