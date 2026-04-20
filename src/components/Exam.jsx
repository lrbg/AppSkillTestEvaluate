import { useState, useRef, useCallback } from 'react';
import { QUESTIONS } from '../data/questions';
import { calculateScore } from '../utils/scoring';
import { saveReport } from '../utils/storage';
import QuestionCard from './QuestionCard';
import Timer, { useElapsedTimer } from './Timer';

export default function Exam({ candidateName, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const startTime = useRef(new Date().toISOString());
  const elapsed = useElapsedTimer();

  const answeredCount = Object.keys(answers).filter(k => answers[k]?.length > 0).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const handleAnswer = useCallback((qId, selected) => {
    setAnswers(prev => ({ ...prev, [qId]: selected }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    const endTime = new Date().toISOString();
    const score = calculateScore(answers);
    const report = {
      candidateName,
      startTime: startTime.current,
      endTime,
      durationSeconds: elapsed,
      answers,
      score
    };
    const id = saveReport(report);
    onFinish({ ...report, id });
  }, [submitted, answers, candidateName, elapsed, onFinish]);

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const q = QUESTIONS[current];
  const unanswered = QUESTIONS.filter(q => !answers[q.id] || answers[q.id].length === 0);

  return (
    <div className="exam-layout">
      {/* Top bar */}
      <header className="exam-header">
        <div className="exam-header-left">
          <div className="exam-candidate">
            <span className="candidate-icon">👤</span>
            <span>{candidateName}</span>
          </div>
          <div className="exam-progress-text">
            {answeredCount}/{QUESTIONS.length} respondidas
          </div>
        </div>
        <div className="exam-header-center">
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-pct">{progress}%</span>
        </div>
        <div className="exam-header-right">
          <Timer onTimeUp={handleTimeUp} paused={submitted} />
        </div>
      </header>

      <div className="exam-body">
        {/* Sidebar navigation */}
        <aside className="exam-sidebar">
          <div className="sidebar-title">Preguntas</div>
          <div className="sidebar-grid">
            {QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id]?.length > 0;
              const isCurrent = idx === current;
              return (
                <button
                  key={q.id}
                  className={`nav-dot ${isCurrent ? 'nav-current' : ''} ${isAnswered ? 'nav-answered' : ''}`}
                  onClick={() => setCurrent(idx)}
                  title={`P${idx + 1}: ${q.block}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className="sidebar-legend">
            <div className="legend-item"><span className="legend-dot answered" />Respondida</div>
            <div className="legend-item"><span className="legend-dot current" />Actual</div>
            <div className="legend-item"><span className="legend-dot pending" />Pendiente</div>
          </div>
        </aside>

        {/* Main question area */}
        <main className="exam-main">
          <div className="question-header">
            <span className="question-counter">Pregunta {current + 1} de {QUESTIONS.length}</span>
            <span className="question-time-est">⏱ ~{q.timeEstimate} min</span>
          </div>

          <QuestionCard
            question={q}
            answer={answers[q.id]}
            onChange={handleAnswer}
          />

          <div className="exam-nav-buttons">
            <button
              className="btn-secondary"
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
            >
              ← Anterior
            </button>

            {current < QUESTIONS.length - 1 ? (
              <button
                className="btn-primary"
                onClick={() => setCurrent(c => c + 1)}
              >
                Siguiente →
              </button>
            ) : (
              <button
                className="btn-submit"
                onClick={() => setShowConfirm(true)}
                disabled={submitted}
              >
                Finalizar Evaluación ✓
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2>¿Finalizar evaluación?</h2>
            {unanswered.length > 0 ? (
              <p className="modal-warning">
                ⚠️ Tienes <strong>{unanswered.length} pregunta{unanswered.length > 1 ? 's' : ''} sin responder</strong>.<br/>
                Las preguntas sin respuesta contarán como incorrectas.
              </p>
            ) : (
              <p className="modal-ok">✅ Has respondido todas las preguntas.</p>
            )}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>
                Revisar respuestas
              </button>
              <button className="btn-submit" onClick={() => { setShowConfirm(false); handleSubmit(); }}>
                Sí, finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
