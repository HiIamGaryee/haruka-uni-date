import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CosmicCelebrationOverlay } from './components/cosmos/CosmicCelebrationOverlay'
import { FindMatchOverlay } from './components/matching/FindMatchOverlay'
import { RouteOverlayReset } from './components/RouteOverlayReset'
import { ScrollToTop } from './components/ScrollToTop'
import { AuthProvider } from './context/AuthProvider'
import { MatchingProvider } from './context/MatchingProvider'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { UserGuard } from './pages/auth/UserGuard'
import { AdminGuard } from './pages/admin/AdminGuard'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage'
import { AdminUsersPage } from './pages/admin/AdminUsersPage'
import { AdminWaitingPage } from './pages/admin/AdminWaitingPage'
import { AdminMatchesPage } from './pages/admin/AdminMatchesPage'
import { AdminReportsPage } from './pages/admin/AdminReportsPage'
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage'
import { AdminLogsPage } from './pages/admin/AdminLogsPage'
import { CreateProfilePage } from './pages/onboarding/CreateProfilePage'
import { MatchPage } from './pages/match/MatchPage'
import { MatchResultPage } from './pages/match/MatchResultPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { HomePage } from './pages/HomePage'
import { DemoPage } from './pages/DemoPage'
import { AboutPage } from './pages/AboutPage'
import { FaqPage } from './pages/FaqPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MatchingProvider>
          <ScrollToTop />
          <RouteOverlayReset />
          <FindMatchOverlay />
          <CosmicCelebrationOverlay />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/signup" element={<Navigate to="/register" replace />} />
            <Route element={<UserGuard />}>
              <Route path="/create-profile" element={<CreateProfilePage />} />
              <Route path="/onboarding" element={<Navigate to="/create-profile" replace />} />
              <Route path="/match" element={<MatchPage />} />
              <Route path="/match-result/:matchId" element={<MatchResultPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
            </Route>
            <Route path="/admin-dash/login" element={<AdminLoginPage />} />
            <Route path="/admin-dash" element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="waiting" element={<AdminWaitingPage />} />
                <Route path="matches" element={<AdminMatchesPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="logs" element={<AdminLogsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MatchingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
