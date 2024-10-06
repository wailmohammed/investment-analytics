// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Dividends from './pages/Dividends';
import Analysis from './pages/Analysis';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

const Layout = ({ children }) => (
  <div className="App">
    <Navigation />
    <main className="main-content">
      {children}
    </main>
    <footer>
      <p>&copy; 2024 InvestAnalytics. All rights reserved.</p>
    </footer>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <ProtectedRoute path="/portfolio" component={Portfolio} />
            <ProtectedRoute path="/dividends" component={Dividends} />
            <ProtectedRoute path="/analysis" component={Analysis} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;