import {
  analyticsVideo,
  recentlyProcessed,
  videoLibrary,
} from '../../../data/mockData';
import type { Video } from '../../../types';

const allVideos: Video[] = [
  ...videoLibrary,
  analyticsVideo,
  ...recentlyProcessed.filter((v) => !videoLibrary.some((l) => l.id === v.id)),
];

export function getVideoById(id: string | undefined): Video {
  if (!id) return analyticsVideo;
  return allVideos.find((v) => v.id === id) ?? analyticsVideo;
}
