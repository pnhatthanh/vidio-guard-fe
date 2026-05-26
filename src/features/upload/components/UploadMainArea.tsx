import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { VideoDropZone } from './VideoDropZone';
import { UploadIntroSection } from './UploadIntroSection';
import { UploadSessionPanel } from './UploadSessionPanel';
import { UploadSuccessOverlay } from './UploadSuccessOverlay';
import type { useUploadSession } from '../hooks/useUploadSession';

const CELEBRATE_MS = 650;
const FADE_MS = 420;

type UploadTransition = 'idle' | 'celebrate' | 'crossfade' | 'enter-dropzone';

type UploadMainAreaProps = {
  session: ReturnType<typeof useUploadSession>;
  onUploadFile: (file: File) => Promise<string>;
};

export function UploadMainArea({ session, onUploadFile }: UploadMainAreaProps) {
  const [transition, setTransition] = useState<UploadTransition>('idle');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const handleUploadSuccess = useCallback(() => {
    clearTimers();
    setTransition('celebrate');

    schedule(() => {
      setTransition('crossfade');
      schedule(() => {
        session.clearAll();
        setTransition('enter-dropzone');
        schedule(() => setTransition('idle'), FADE_MS);
      }, FADE_MS);
    }, CELEBRATE_MS);
  }, [clearTimers, schedule, session]);

  const showPreview = session.hasItems;
  const previewHidden = transition === 'crossfade' || transition === 'enter-dropzone';
  const dropzoneHidden = showPreview && transition !== 'crossfade' && transition !== 'enter-dropzone';

  const previewEntering = showPreview && transition === 'idle' && !previewHidden;
  const needsPreviewHeight =
    showPreview || transition === 'celebrate' || transition === 'crossfade';

  return (
    <Box className="flex flex-col" sx={{ gap: needsPreviewHeight ? 3 : 2.5 }}>
      <Box
        className="upload-stage"
        sx={{
          position: 'relative',
          minHeight: needsPreviewHeight ? { xs: 360, md: 480 } : 'auto',
        }}
      >
        {/* Dropzone — luôn render khi cần crossfade */}
        <Box
          className={dropzoneHidden ? 'upload-layer upload-layer--hidden' : 'upload-layer upload-layer--visible'}
          sx={{
            ...(transition === 'enter-dropzone' && { animation: `uploadFadeIn ${FADE_MS}ms ease forwards` }),
          }}
        >
          <VideoDropZone onFiles={session.addFiles} />
        </Box>

        {/* Preview — overlay khi có file */}
        {showPreview && session.activeItem && session.activeId && (
          <Box
            className={
              previewHidden
                ? 'upload-layer upload-layer--exit'
                : previewEntering
                  ? 'upload-layer upload-layer--enter'
                  : 'upload-layer upload-layer--visible'
            }
            sx={{ position: 'absolute', inset: 0, zIndex: 2 }}
          >
            <UploadSessionPanel
              items={session.items}
              activeId={session.activeId}
              activeItem={session.activeItem}
              onSelect={session.setActiveId}
              onRemove={session.removeItem}
              onAddFiles={session.addFiles}
              onDuration={session.setDuration}
              onUploadFile={onUploadFile}
              onUploadSuccess={handleUploadSuccess}
            />
            {transition === 'celebrate' && <UploadSuccessOverlay />}
          </Box>
        )}
      </Box>

      <Box
        className={
          !session.hasItems && transition !== 'crossfade'
            ? 'upload-intro upload-intro--visible'
            : 'upload-intro upload-intro--hidden'
        }
      >
        <UploadIntroSection />
      </Box>
    </Box>
  );
}
