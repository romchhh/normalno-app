"use client";

import Image, { type ImageProps } from "next/image";
import {
  canOptimizeCarPhoto,
  isExternalCarPhotoUrl,
  resolveCarPhotoUrl,
} from "@/lib/car-photo";

type CarImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Renders car photos from local uploads or any external host.
 * External URLs (postimg, imgbb, …) use a plain <img> so they are not
 * blocked by next/image remotePatterns / optimizer fetches.
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
  const resolved = resolveCarPhotoUrl(src);

  if (!canOptimizeCarPhoto(resolved) && isExternalCarPhotoUrl(resolved)) {
    const externalClassName = fill
      ? `absolute inset-0 h-full w-full ${className ?? ""}`.trim()
      : className;

    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin photo hosts
      <img
        src={resolved}
        alt={alt}
        className={externalClassName}
        style={style}
        sizes={fill ? undefined : sizes}
        loading={priority ? "eager" : loading === "eager" ? "eager" : "lazy"}
        decoding="async"
        draggable={draggable}
        referrerPolicy="no-referrer"
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      className={className}
      fill={fill}
      style={style}
      sizes={sizes}
      priority={priority}
      loading={loading}
      draggable={draggable}
      onLoad={onLoad}
      onError={onError}
      {...rest}
    />
  );
}
