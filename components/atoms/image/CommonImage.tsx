import Image from "next/image";

const CommonImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <Image src={src} layout="fill" objectFit="cover" alt={alt} />
    </div>
  );
};

export default CommonImage;
