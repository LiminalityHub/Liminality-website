import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';

// Admin pages
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminPostEditor from './admin/pages/AdminPostEditor';
import RequireAuth from './admin/components/RequireAuth';

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/posts/new"
              element={
                <RequireAuth>
                  <AdminPostEditor />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/posts/edit/:id"
              element={
                <RequireAuth>
                  <AdminPostEditor />
                </RequireAuth>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
