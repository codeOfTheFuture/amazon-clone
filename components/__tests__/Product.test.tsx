import { render, screen, fireEvent, act } from "@testing-library/react";
import Product from "@/components/Product";
import { Provider } from "react-redux";
import { createStore } from "@/redux/store";
import { mockProducts } from "@/__mocks__/mockData";

describe("Product", () => {
	const store = createStore();

	beforeEach(async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<Product product={mockProducts[0]} />
				</Provider>
			);
		});
	});

	test("renders all fields of a product", () => {
		const productElement = screen.getByTestId("product");
		const imageElement = screen.getByAltText(mockProducts[0].title);
		const titleElement = screen.getByText(mockProducts[0].title);
		const categoryElement = screen.getByText(mockProducts[0].category);
		const ratingElement = screen.getByRole("product-rating");
		const descriptionElement = screen.getByText(mockProducts[0].description);
		const priceElement = screen.getByText(
			`$${mockProducts[0].price.toFixed(2)}`
		);
		const buttonElement = screen.getByText(/add to basket/i);

		expect(productElement).toBeInTheDocument();
		expect(imageElement).toBeInTheDocument();
		expect(titleElement).toBeInTheDocument();
		expect(categoryElement).toBeInTheDocument();
		expect(ratingElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(priceElement).toBeInTheDocument();
		expect(buttonElement).toBeInTheDocument();
	});

	test("should dispatch addToBasket action when Add to Basket button is clicked", () => {
		const buttonElement = screen.getByText(/add to basket/i);

		fireEvent.click(buttonElement);

		const reduxState = store.getState();

		expect(reduxState).toEqual({
			basketReducer: {
				items: [
					{
						...mockProducts[0],
						hasPrime: expect.any(Boolean),
						uuid: expect.any(String),
					},
				],
			},
		});
	});
});
