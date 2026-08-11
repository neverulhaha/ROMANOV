import React, { useState, useEffect } from 'react';

/**
 * SmartImage — Компонент автоматического подбора формата изображений.
 * Пытается загрузить запрошенный файл, а в случае ошибки (или смены расширения на .png/.jpg/.webp/.avif)
 * автоматически перебирает альтернативные расширения.
 */
export default function SmartImage({ src, alt = '', className = '', ...props }) {
  if (!src) return null;

  const basePath = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  const originalExt = src.slice(basePath.length).toLowerCase();

  // Список всех возможных расширений (оригинальное расширение в начале)
  const allExts = Array.from(new Set([originalExt, '.png', '.jpg', '.webp', '.avif', '.jpeg'])).filter(Boolean);

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
      onError={handleError}
      {...props}
    />
  );
}
