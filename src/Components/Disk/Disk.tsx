import styles from "./Disk.module.css";
type DiskProps = {
  imageSource: string;
  imageAltName: string;
  className: string;
  selected?: boolean;
};

export default function Disk({ imageSource, imageAltName, className, selected }: DiskProps) {
  const diskClass = selected ? `${className} ${styles.selected}` : className;
  return <img src={imageSource} alt={imageAltName} className={diskClass} />;
}
