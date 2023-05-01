/**
 * Formats a number as currency in USD format.
 *
 * @param {number} number - The number to format as currency.
 * @returns {string} A string representation of the formatted currency.
 */
export const formatCurrency = (number: number): string => {
	const format = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return format.format(number);
};
