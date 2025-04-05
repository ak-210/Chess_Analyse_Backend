export const FindWinPercentage = (cp) => {
	return 50 + 50 * (2 / (1 + Math.pow(Math.E, -0.00368208 * cp)) - 1)
};
