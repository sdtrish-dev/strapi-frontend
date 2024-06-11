import Image from "next/image";
import Link from "next/link";

const Logo = ({
  logoUrl,
  logoText,
}: {
  logoUrl: string;
  logoText: string;
}) => {
  return (
    <div className="logo-container">
      <Link href='/'>
        <Image src={logoUrl} alt={logoText} width={180} height={180} />
      </Link>
      <p className="logo-text">{logoText}</p>
    </div>
  );
};

export default Logo;
