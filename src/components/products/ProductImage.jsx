import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }) {
  const [unavailable, setUnavailable] = useState(!src);

  if (unavailable) {
    return (
      <div
        className={`product-image-placeholder ${className}`}
        aria-label="Фото товару буде додано"
      >
        <span aria-hidden="true">⌚</span>
        <small>Фото незабаром</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setUnavailable(true)}
    />
  );
}
