export const dynamic = 'force-dynamic';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/Accordion";

// import SmartReq_logo from "@/public/SmartReq_logo.png";
import { getFaqs } from "@/app/services/getFaqService";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default async function FAQPage() {
  const faqData = await getFaqs();

  console.log(faqData);

  return (
    // 1. Main Page Container
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header Section */}
      <header className="flex h-20 w-full items-center justify-between shadow-sm border-b border-gray-100 px-12">
        {/* Logo */}
        <a href="/" className="relative flex items-center">
          <img
            // src={SmartReq_logo.src}
            className="h-20 w-auto object-contain"
            alt="SmartReqBynext tool"
          />
        </a>

        {/* Login Button */}
        <Link href="/">
          <button className="rounded-md bg-[#13499F] px-6 py-2 text-lg font-semibold leading-7 text-white hover:opacity-90 transition-all cursor-pointer">
            Login
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 py-16 pl-50 pr-50">
        {/* Page Title */}
        <div className="mb-10 text-2xl text-gray-900 tracking-tight sm:text-3xl">
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h1>
        </div>

        {/* Accordion Container */}
        <div className="bg-white">
          <Accordion className="w-full">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={String(faq.id)}>
                <AccordionTrigger className="text-[17px] font-semibold py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-[15px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
