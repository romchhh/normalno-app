"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState, type SyntheticEvent } from "react";
import {
  canOptimizeCarPhoto,
  isExternalCarPhotoUrl,
  resolveCarPhotoUrl,
} from "@/lib/car-photo";

type CarImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

const FALLBACK_SRC = "/logo.svg";

/**
 * Renders car photos from local uploads or any external host.
 * External URLs use a plain <img>; broken hosts (DNS fail) fall back to logo.
 */
export default function CarImage({
  src,
  alt,
  className,
  fill,
  style,
  sizes,
  priority,
  loading,
  draggable,
  onLoad,
  onError,
  ...rest
}: CarImageProps) {
  const resolved = resolveCarPhotoUrl(src) || FALLBACK_SRC;
  const [currentSrc, setCurrentSrc] = useState(resolved);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(resolveCarPhotoUrl(src) || FALLBACK_SRC);
    setFailed(false);
  }, [src]);

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!failed && currentSrc !== FALLBACK_SRC) {
      setFailed(true);
      setCurrentSrc(FALLBACK_SRC);
    }
    onError?.(event);
  };

  if (
    !failed &&
    !canOptimizeCarPhoto(currentSrc) &&
    isExternalCarPhotoUrl(currentSrc)
  ) {
    const externalClassName = fill
      ? `absolute inset-0 h-full w-full ${className ?? ""}`.trim()
      : className;

    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin photo hosts
      <img
        src={currentSrc}
        alt={alt}
        className={externalClassName}
        style={style}
        sizes={fill ? undefined : sizes}
        loading={priority ? "eager" : loading === "eager" ? "eager" : "lazy"}
        decoding="async"
        draggable={draggable}
        referrerPolicy="no-referrer"
        onLoad={onLoad}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      className={className}
      fill={fill}
      style={style}
      sizes={sizes}
      priority={priority}
      loading={loading}
      draggable={draggable}
      onLoad={onLoad}
      onError={handleError}
      unoptimized={failed || currentSrc === FALLBACK_SRC}
      {...rest}
    />
  );
}
