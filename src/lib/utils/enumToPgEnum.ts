export const enumToPgEnum = <T extends Record<string, unknown>>(
	myEnum: T
): [T[keyof T], ...T[keyof T][]] => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return Object.values(myEnum).map((value: unknown) => `${value}`) as any;
};
