import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const Layout =  React.lazy(() => import('./views/layout/index'));
const Home = React.lazy(() => import('./views/Home/index'));
const Contact = React.lazy(() => import('./views/Contact/index'));

const isAuthenticated = () => {
  // Replace this with real authentication check logic
 // return Cookies.get('isAuthenticated') === "true";
 return true;
};
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<PrivateRoute element={<Layout />} />}>
            <Route path="/" element={<Home />} /> 
            <Route path="/contact-us" element={<Contact />} /> 
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
