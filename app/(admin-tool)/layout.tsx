import "@/app/globals.css";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import BodyClass from "@/app/components/BodyClass";
import { Poppins } from "next/font/google";
import MsalProviderWrapper from "@/providers/MsalProviderWrapper";
import { LoaderProvider } from "@/context/LoaderContext";
import GlobalLoader from "@/app/components/GlobalLoader";
import { AuthProvider } from "@/context/AdminAuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "nextTool",
  description: "Basic Next.js setup",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { token } = useAuth();

  //  useEffect(() => {
  //   if (!token) router.push("/login");
  // }, [token]);

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50`}>
        <AuthProvider>
          <LoaderProvider>
            <BodyClass />
            <LayoutWrapper>
              <MsalProviderWrapper>
                <GlobalLoader />
                {children}
              </MsalProviderWrapper>
            </LayoutWrapper>
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
