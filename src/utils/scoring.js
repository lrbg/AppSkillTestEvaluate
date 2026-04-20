import { QUESTIONS, TOTAL_POINTS, getLevel } from '../data/questions';

export function calculateScore(answers) {
  let earned = 0;
  const details = [];

  QUESTIONS.forEach(q => {
    const userAnswer = answers[q.id] || [];
    const correct = q.correct.slice().sort();
    const given = userAnswer.slice().sort();
    const isCorrect = JSON.stringify(correct) === JSON.stringify(given);
    if (isCorrect) earned += q.points;
    details.push({
      questionId: q.id,
      question: q.question,
      block: q.block,
      difficulty: q.difficulty,
      points: q.points,
      earned: isCorrect ? q.points : 0,
      isCorrect,
      userAnswer: given,
      correctAnswer: correct,
      explanation: q.explanation,
      options: q.options,
      code: q.code || null
    });
  });

  const percentage = Math.round((earned / TOTAL_POINTS) * 100);
  const level = getLevel(percentage);

  const blockScores = {};
  details.forEach(d => {
    if (!blockScores[d.block]) blockScores[d.block] = { earned: 0, total: 0, count: 0, correct: 0 };
    blockScores[d.block].earned += d.earned;
    blockScores[d.block].total += d.points;
    blockScores[d.block].count += 1;
    blockScores[d.block].correct += d.isCorrect ? 1 : 0;
  });

  return { earned, total: TOTAL_POINTS, percentage, level, details, blockScores };
}

export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
