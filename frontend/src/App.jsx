import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home, Auth, Orders, Menu } from './pages';
import Header from './components/shared/Header';
import Tables from './pages/Tables';
import { useSelector } from 'react-redux';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';
import Dashboard from './pages/Dashboard';


function Layout() {
  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector(state => state.user);
  if (isLoading) return <FullScreenLoader />
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
        <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>} />
        <Route path="/tables" element={
          <ProtectedRoute>
            <Tables />
          </ProtectedRoute>} />
        <Route path="/menu" element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

function ProtectedRoute({ children }) {
  const { isAuth } = useSelector(state => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />
  }
  return children;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
