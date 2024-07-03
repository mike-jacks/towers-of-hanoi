type DiskProps = {
  imageSource: string;
  imageAltName: string;
  className: string;
};

export default function Disk({ imageSource, imageAltName, className }: DiskProps) {
  return <img src={imageSource} alt={imageAltName} className={className} />;
}
