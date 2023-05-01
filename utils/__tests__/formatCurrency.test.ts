import { formatCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
	test("formats the number correctly a USD currency", () => {
		const number = 1234.56;
		const expected = "$1,234.56";

		const result = formatCurrency(number);

		expect(result).toBe(expected);
	});
});
