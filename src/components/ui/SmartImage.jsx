import React, { useState, useEffect } from 'react';

/**
 * SmartImage — Оптимизированный компонент подбора формата и загрузки изображений.
 * - Приоритетно загружает формат .webp
 * - Использует асинхронный декодинг (decoding="async") и ленивую загрузку (loading="lazy")
 * - Поддерживает проп priority={true} для ускорения ключевых (LCP) ресурсов
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  loading,
  priority = false,
  ...props
}) {
  if (!src) return null;

  const basePath = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  const originalExt = src.slice(basePath.length).toLowerCase();

  // Список всех возможных расширений (.webp в первую очередь, затем оригинальное и фолбэки)
  const allExts = Array.from(new Set(['.webp', originalExt, '.png', '.jpg', '.avif', '.jpeg'])).filter(Boolean);

  const [extIndex, setExtIndex] = useState(0);

  useEffect(() => {
    setExtIndex(0);
  }, [src]);

  const handleError = () => {
    if (extIndex < allExts.length - 1) {
      setExtIndex((prev) => prev + 1);
    }
  };

  const currentSrc = `${basePath}${allExts[extIndex]}`;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : (loading || 'lazy')}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={handleError}
      {...props}
    />
  );
}
