import JSZip from 'jszip';

export function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadZip(files) {
  const zip = new JSZip();
  for (const { name, content } of files) {
    zip.file(name, content);
  }
  const blob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'generated-site.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 