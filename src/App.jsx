import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Exam from './components/Exam';
import Results from './components/Results';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// Secret admin token — change this to your desired secret path
const ADMIN_TOKEN = 'qa-admin-r7k9mx2';

function EvaluationFlow() {
  const [phase, setPhase] = useState('welcome'); // welcome | exam | results
  const [candidateName, setCandidateName] = useState('');
  const [reportData, setReportData] = useState(null);

  function handleStart(name) {
    setCandidateName(name);
    setPhase('exam');
  }

  function handleFinish(data) {
    setReportData(data);
    setPhase('results');
  }

  function handleRestart() {
    setCandidateName('');
    setReportData(null);
    setPhase('welcome');
  }

  if (phase === 'welcome') return <Welcome onStart={handleStart} />;
  if (phase === 'exam') return <Exam candidateName={candidateName} onFinish={handleFinish} />;
  if (phase === 'results') return <Results reportData={reportData} onRestart={handleRestart} />;
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<EvaluationFlow />} />
        <Route path={`/${ADMIN_TOKEN}`} element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
