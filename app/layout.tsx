import { Providers as AuthProviders } from "@/app/providers";
import { Provider } from "@/redux/provider";
import { ReactNode } from "react";

import { Open_Sans } from "next/font/google";
import "@/globals.css";

const openSans = Open_Sans({
	weight: "400",
	subsets: ["latin"],
});

export const metadata = {
	title: "Amazon Clone. Spend less. Smile More.",
	icons: {
		icon: "/favicon.png",
	},
};

interface Props {
	children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return (
		<html lang="en">
			<body className={openSans.className}>
				<AuthProviders>
					<Provider>{children}</Provider>
				</AuthProviders>
			</body>
		</html>
	);
};

export default RootLayout;
