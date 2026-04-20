const STORAGE_KEY = 'qa_eval_reports';

export function saveReport(report) {
  const reports = getAllReports();
  const newReport = {
    ...report,
    id: Date.now().toString(),
    savedAt: new Date().toISOString()
  };
  reports.push(newReport);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return newReport.id;
}

export function getAllReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getReportById(id) {
  return getAllReports().find(r => r.id === id) || null;
}

export function deleteReport(id) {
  const reports = getAllReports().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function clearAllReports() {
  localStorage.removeItem(STORAGE_KEY);
}
