import Image from "next/image";
import Link from "next/link";

const Footer = ({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  lang
}: {
  logoUrl: string;
  logoText: string;
  menuLinks: any[];
  categoryLinks: any[];
  lang: string;
}) => {

  return (
    <footer className="footer-container">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="footer-logo">
          <Link href='/'>
            <Image src={logoUrl} width={180} height={180} alt="Company Logo" />
          </Link>
          <span className="footer-text">{logoText}</span>
        </div>
        <div className="footer-section">
          <div className="footer-links">
            <h4 className="footer-heading">Links</h4>
            {menuLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="footer-link"
                target={link.newTab ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            ))}
          </div>
          <div className="footer-categories">
            <h4 className="footer-heading">Categories</h4>
            {categoryLinks.map((category) => (
              <Link
                key={category.id}
                href={`/${lang}/categories/${category.attributes.slug}`}
                className="footer-link"
                prefetch={false}
              >
                {category.attributes.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;