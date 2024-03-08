import { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { basePath } from "@/services/constants";

/** Wrapper for Next's Image component. Adds basepath to correctly locate static assets.
 * Supports fallback image in case the src fails to load.
 */

interface Props {
  src: string | StaticImageData;
  alt: string;
  fallback?: string | StaticImageData;
  [key: string]: any;
}

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

const Img = ({ fallback, src, alt, ...props }: Props) => {
  const [error, setError] = useState(false); // True if the image fails to load.

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      src={
        (error && fallback) || // If the image fails to load, use the fallback if provided.
        (typeof src === "string" && src.startsWith("/assets")
          ? `${basePath}${src}`
          : src)
      }
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  alt: PropTypes.string.isRequired,
  fallback: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

Img.defaultProps = {
  fallback: "",
};

export default Img;
