import { useCallback, useEffect, useRef, useState } from 'react';

export type UploadItem = {
  id: string;
  file: File;
  previewUrl: string;
  durationSec?: number;
};

function createItem(file: File): UploadItem {
  return {
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export function useUploadSession() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = items.find((i) => i.id === activeId) ?? items[0] ?? null;

  // Đồng bộ activeId khi danh sách thay đổi (xóa video đang chọn)
  useEffect(() => {
    if (items.length === 0) {
      setActiveId(null);
      return;
    }
    if (!activeId || !items.some((i) => i.id === activeId)) {
      setActiveId(items[0].id);
    }
  }, [items, activeId]);

  const addFiles = useCallback((files: File[]) => {
    if (files.length === 0) return;
    const newItems = files.map(createItem);
    setItems((prev) => [...prev, ...newItems]);
    setActiveId((current) => current ?? newItems[0].id);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const setDuration = useCallback((id: string, durationSec: number) => {
    if (!Number.isFinite(durationSec)) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, durationSec } : item)),
    );
  }, []);

  const clearAll = useCallback(() => {
    setItems((prev) => {
      prev.forEach((i) => URL.revokeObjectURL(i.previewUrl));
      return [];
    });
    setActiveId(null);
  }, []);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    };
  }, []);

  return {
    items,
    activeItem,
    activeId: activeItem?.id ?? null,
    setActiveId,
    addFiles,
    removeItem,
    setDuration,
    clearAll,
    hasItems: items.length > 0,
  };
}
