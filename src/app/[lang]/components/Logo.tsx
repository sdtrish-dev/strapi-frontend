import Image from "next/image";

const Logo = ({
  logoUrl,
  logoText,
}: {
  logoUrl: string;
  logoText: string;
}) => {
  return (
    <div className="logo-container">
      <Image src={logoUrl} alt={logoText} width={180} height={180} />
      <p className="logo-text">{logoText}</p>
    </div>
  );
};

export default Logo;
