"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface ImageWithFallbackProps extends React.ComponentPropsWithoutRef<typeof Image> {
  fallbackSrc: string;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
