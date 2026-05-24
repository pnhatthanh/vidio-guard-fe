import { useEffect, useState } from 'react';
import type { LandingSectionId } from '../types/landing.types';

export function useScrollSpy(sectionIds: LandingSectionId[], offset = 120) {
  const [activeId, setActiveId] = useState<LandingSectionId>(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset;
      let current: LandingSectionId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
