import { act, render, screen } from "@testing-library/react";
import ProductFeed from "@/components/ProductFeed";
import { mockProducts } from "@/__mocks__/mockData";
import { Provider } from "@/redux/provider";

describe("Product Feed", () => {
	beforeEach(async () => {
		fetchMock.mockResponseOnce(JSON.stringify(mockProducts));

		await act(async () => {
			render(
				<Provider>
					<ProductFeed products={mockProducts} />
				</Provider>
			);
		});
	});

	afterEach(() => {
		fetchMock.resetMocks();
	});

	test("renders a list of products", async () => {
		const productElements = screen.getAllByTestId("product");
		expect(productElements).toHaveLength(2);

		const product1 = productElements[0];
		expect(product1).toHaveTextContent("Product 1");
		expect(product1).toHaveTextContent("This is the first product");
		expect(product1).toHaveTextContent("$9.99");
		expect(product1).toHaveTextContent("electronics");
		expect(product1).toHaveTextContent("Add to Basket");

		const product2 = productElements[1];
		expect(product2).toHaveTextContent("Product 2");
		expect(product2).toHaveTextContent("This is the second product");
		expect(product2).toHaveTextContent("$19.99");
		expect(product2).toHaveTextContent("clothing");
		expect(product1).toHaveTextContent("Add to Basket");
	});
});
