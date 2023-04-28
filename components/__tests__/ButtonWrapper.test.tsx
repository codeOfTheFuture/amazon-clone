import { render, screen, fireEvent } from "@testing-library/react";
import ButtonWrapper from "@/components/ButtonWrapper";

describe("ButtonWrapper", () => {
	const handleClick = jest.fn();

	beforeEach(() => {
		render(
			<ButtonWrapper onClick={handleClick} className="test-class">
				Click me!
			</ButtonWrapper>
		);
	});

	test("renders a button element", () => {
		const buttonElement = screen.getByRole("button", { name: "Click me!" });
		expect(buttonElement).toBeInTheDocument();
	});

	test("calls onClick when the button is clicked", () => {
		const buttonElement = screen.getByRole("button", { name: "Click me!" });

		fireEvent.click(buttonElement);

		expect(handleClick).toHaveBeenCalled();
	});

	test("renders children inside the button", () => {
		const buttonTextElement = screen.getByText(/click me!/i);
		expect(buttonTextElement).toBeInTheDocument();
	});

	test("passes additional props to the button element", () => {
		const buttonElement = screen.getByRole("button", { name: "Click me!" });
		expect(buttonElement).toHaveAttribute("type", "button");
	});
});
