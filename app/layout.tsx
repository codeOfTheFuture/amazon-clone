import { Providers as AuthProviders } from "@/app/providers";
import { Provider } from "@/redux/provider";
import { ReactNode } from "react";

import "@/globals.css";

export const metadata = {
	title: "Amazon Clone. Spend less. Smile More.",
};

interface Props {
	children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
	return (
		<html lang="en">
			<body>
				<AuthProviders>
					<Provider>{children}</Provider>
				</AuthProviders>
			</body>
		</html>
	);
};

export default RootLayout;
