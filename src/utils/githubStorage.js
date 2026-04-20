const OWNER = 'lrbg';
const REPO = 'AppSkillTestEvaluate';
const BRANCH = 'gh-pages';
const TOKEN_KEY = 'qa_gh_token';

export function setToken(token) { localStorage.setItem(TOKEN_KEY, token.trim()); }
export function getToken() { return localStorage.getItem(TOKEN_KEY) || ''; }
export function clearToken() { localStorage.removeItem(TOKEN_KEY); }
export function hasToken() { return !!localStorage.getItem(TOKEN_KEY); }

function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

async function ghFetch(path, options = {}) {
  const token = getToken();
  if (!token) throw new Error('No GitHub token configured');
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `GitHub API error ${res.status}`);
  }
  return res.json();
}

export async function saveReportToGitHub(report) {
  const filename = `reports/report-${report.id}.json`;
  const content = encodeBase64(JSON.stringify(report, null, 2));

  // Fetch SHA if file already exists (needed for updates)
  let sha;
  try {
    const existing = await ghFetch(`${filename}?ref=${BRANCH}`);
    sha = existing.sha;
  } catch (_) { /* file doesn't exist yet — ok */ }

  await ghFetch(filename, {
    method: 'PUT',
    body: JSON.stringify({
      message: `report: ${report.candidateName} — ${new Date(report.savedAt).toISOString().slice(0, 10)}`,
      content,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function getAllReportsFromGitHub() {
  let files;
  try {
    files = await ghFetch(`reports?ref=${BRANCH}`);
  } catch (err) {
    if (err.message.includes('404') || err.message.toLowerCase().includes('not found')) {
      return []; // reports/ directory doesn't exist yet
    }
    throw err;
  }

  const jsonFiles = Array.isArray(files) ? files.filter(f => f.name.endsWith('.json') && f.name !== '.gitkeep') : [];
  if (jsonFiles.length === 0) return [];

  const reports = await Promise.all(
    jsonFiles.map(async f => {
      // Cache bust to always get latest
      const res = await fetch(`${f.download_url}?cb=${Date.now()}`);
      if (!res.ok) return null;
      return res.json();
    })
  );

  return reports
    .filter(Boolean)
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
}

export async function deleteReportFromGitHub(report) {
  const filename = `reports/report-${report.id}.json`;
  const file = await ghFetch(`${filename}?ref=${BRANCH}`);
  await ghFetch(filename, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `report: delete evaluation for ${report.candidateName}`,
      sha: file.sha,
      branch: BRANCH,
    }),
  });
}

export async function validateToken(token) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) throw new Error('Token inválido o sin acceso al repositorio');
  return true;
}
