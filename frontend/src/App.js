import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/authPages/LoginPage';
import InvitePage from './pages/InvitePage';
import Profile from './pages/profile/ProfilePage';
import VerifyUserPage from './pages/authPages/VerifyUserPage';
import UserListPage from './pages/adminPages/UsersListPage';
import AssessmentSubmission from './pages/assessmentSubmissionPages/AssessmentSubmission';
import QuizPage from './pages/quizPage/QuizPage';
import TeacherGrading from './pages/TeacherGradingPages/TeacherGrading';
import StudentDashboardPage from './pages/dashboardPages/StudentDashboard';

import Header from './components/common/AppHeader';
import Footer from './components/common/Footer';

const App = () => {
    return (
        <Router>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/invite-user" element={<InvitePage />} />
                <Route path="/verify/:token" element={<VerifyUserPage />} />
                <Route path="/user-list" element={<UserListPage />} />
                <Route path="/assessment-submission" element={<AssessmentSubmission />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/teacher-grading" element={<TeacherGrading />} />
                <Route path="/student-dashboard" element={<StudentDashboardPage />} />
          </Routes>
          <Footer />
        </Router>
    );
};

export default App;
