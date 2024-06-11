import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import AuthProvider from "~/components/provider/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
