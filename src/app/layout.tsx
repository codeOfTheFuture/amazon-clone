import { Providers } from "./providers";
import { ReactNode } from "react";

import "@/globals.css";

export const metadata = {
  title: "Amazon Clone. Spend less. Smile More.",
};

interface Props {
  children: ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
