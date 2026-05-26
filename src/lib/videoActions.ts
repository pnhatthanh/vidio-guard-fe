import { videosApi } from '../api/videos';

/** Mở presigned URL tải file (Content-Disposition: attachment). */
export async function downloadVideoFile(videoId: string): Promise<void> {
  const { download_url, filename } = await videosApi.getDownloadUrl(videoId);
  const anchor = document.createElement('a');
  anchor.href = download_url;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';
  anchor.target = '_blank';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export async function deleteVideo(videoId: string): Promise<void> {
  await videosApi.delete(videoId);
}
