import './App.css';
import './scss/custom.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppBar from './components/AppBar';
import JobsPage from './pages/JobsPage';
import { NAV_LINKS } from './utils/constants';
import BlogPage from './pages/BlogPage';
import ProfilePage from './pages/ProfilePage';
import JobDetailPage from './pages/JobDetailPage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/AboutPage';
import JobAppsPage from './pages/JobAppsPage';
import AnimatedBackground from './components/AnimatedBackground';
import ProfileCreationPage from './pages/ProfileCreationPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App-page">
        <AnimatedBackground>
          <AppBar />
          <Routes>
            <Route path={NAV_LINKS.HOME} element={<HomePage />} />
            <Route path={NAV_LINKS.ABOUT} element={<AboutPage />} />
            <Route path={NAV_LINKS.LOGIN} element={<LoginPage />} />
            <Route path={NAV_LINKS.JOBS} element={<JobsPage />} />
            <Route path={NAV_LINKS.JOBS_APPLIED} element={<JobAppsPage />} />
            <Route
              path={`${NAV_LINKS.JOBS}/:jobId`}
              element={<JobDetailPage />}
            />
            <Route path={NAV_LINKS.BLOG} element={<BlogPage />} />
            <Route path={NAV_LINKS.PROFILE} element={<ProfilePage />} />
            <Route
              path={NAV_LINKS.PROFILE_CREATION}
              element={<ProfileCreationPage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </AnimatedBackground>
      </div>
    </BrowserRouter>
  );
}

export default App;
