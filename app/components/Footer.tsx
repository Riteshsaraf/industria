import logo from "@/public/next.svg";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About Us", href: "https://www.next tool.com/about-us/" },
  { label: "Accessibility", href: "https://www.next tool.com/accessibility/" },
  { label: "Privacy Policy", href: "https://www.next tool.com/privacy-policy/" },
  { label: "Terms of Use", href: "https://www.next tool.com/terms-of-service/" },
  {
    label: "Report a Vulnerability",
    href: "https://www.next tool.com/next tool-vulnerability-disclosure-program-policy/",
  },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-50 w-full py-10 text-[#13499f]">
      <div className="flex flex-col items-center gap-6 px-20">
        {/* 1. Disclaimer */}
        <div className="text-left text-sm font-normal leading-relaxed text-[#1e1e1e]">
          <h2 className="flex text-sm font-semibold pb-4 leading-relaxed">
            Land Acknowledgement
          </h2>
          <p>
            At next tool, we care about people's health and are committed to
            empowering a healthier you. We humbly acknowledge that our company
            conducts its operations across the vast and diverse lands of what is
            now called Canada, home to the traditional territories of First
            Nations, Inuit, and Métis Peoples, each with their distinct
            cultures, languages, and histories. We are mindful of their unique
            rights and perspectives, actively seeking engagement and
            partnership, and striving to build sustainable relationships. Our
            vision of a more inclusive and equitable future guides us in
            providing caring, efficient, reliable, and high-quality services,
            honoring the contributions of Indigenous cultures to Canada's
            tapestry.
          </p>
        </div>

        {/* 2. Navigation Links Area */}
        <nav aria-label="Footer Navigation" className="w-full ">
          <ul className="flex flex-wrap justify-start gap-x-8 gap-y-4 ">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex h-11 items-center justify-center rounded-lg p-1 text-sm font-semibold underline hover:bg-gray-50 hover:no-underline transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. Coppyright Area */}
        <div className="w-full flex flex-row items-center justify-between gap-4 text-center">
          <p className="text-sm text-[#595959]">
            © 2026 next tool LP. All rights reserved
          </p>
          {/* Image */}
          <a href="https://next tool.com/">
            <img
              src={logo.src}
              alt="next tool Logo"
              className="h-[31px] w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
