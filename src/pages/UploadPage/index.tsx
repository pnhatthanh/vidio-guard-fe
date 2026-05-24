import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import { UploadMainArea } from '../../features/upload/components/UploadMainArea';
import { PipelinePanel } from '../../features/upload/components/PipelinePanel';
import { RecentCompletedPanel } from '../../features/upload/components/RecentCompletedPanel';
import { useUploadSession } from '../../features/upload/hooks/useUploadSession';
import { usePipeline } from '../../features/pipeline/PipelineProvider';
import { videosApi } from '../../api/videos';
import { mapListItemToVideo } from '../../lib/videoMappers';
import type { Video } from '../../types';

export default function UploadPage() {
  const session = useUploadSession();
  const { jobs, registerJob, connected } = usePipeline();
  const [recentCompleted, setRecentCompleted] = useState<Video[]>([]);

  useEffect(() => {
    videosApi
      .list({ status: 'completed', limit: 5, sort: 'processed_at', order: 'desc' })
      .then((res) => setRecentCompleted(res.items.map(mapListItemToVideo)))
      .catch(() => setRecentCompleted([]));
  }, [jobs.length]);

  const handleUploadFile = async (file: File) => {
    const res = await videosApi.upload(file);
    registerJob(res.video_id, file.name);
    return res.video_id;
  };

  return (
    <AppShell>
      <TopBar
        title="Tải video"
        subtitle="Upload và xử lý kiểm duyệt bất đồng bộ bằng AI"
      />

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box
          className="grid grid-cols-1 xl:grid-cols-3 gap-5"
          sx={{ alignItems: { xl: 'start' } }}
        >
          <Box className="xl:col-span-2" sx={{ display: 'flex', flexDirection: 'column' }}>
            <UploadMainArea session={session} onUploadFile={handleUploadFile} />
          </Box>

          <Box className="flex flex-col gap-3">
            <PipelinePanel jobs={jobs} connected={connected} />
            <RecentCompletedPanel videos={recentCompleted} />
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}
