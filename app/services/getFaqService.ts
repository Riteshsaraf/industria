import { FaqItem } from "@/app/types/faq";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const url = `${backendUrl}/api/faq`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch FAQs: ${res.status}");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading FAQs: ", error);

    return [];
  }
}
