import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { Providers as AuthProviders } from "@/app/providers";
import { Provider } from "@/redux/provider";
import * as nextAuthReact from "next-auth/react";
import { mockProducts } from "@/__mocks__/mockData";

import HomePage from "@/app/page";

jest.mock("next-auth/react");

const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		pathname: "/",
	}),
}));

const resolvedComponent = async (Component: () => Promise<JSX.Element>) => {
	const ComponentResolved = await Component();
	return () => ComponentResolved;
};

describe("HomePage", () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	test("renders without crashing", async () => {
		nextAuthReactMocked.useSession.mockImplementation(
			(_options?: nextAuthReact.UseSessionOptions<boolean> | undefined) => {
				return { data: null, status: "loading" };
			}
		);

		fetchMock.mockResponseOnce(JSON.stringify(mockProducts));

		const HomePageResolved = await resolvedComponent(HomePage);

		await act(async () => {
			render(
				<AuthProviders>
					<Provider>
						<HomePageResolved />
					</Provider>
				</AuthProviders>
			);
		});
	});
});
