export async function generateCode(prompt, language) {
  const res = await fetch('/api/generate-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, language }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to generate code');
  }
  const data = await res.json();
  return data.code || '';
} 