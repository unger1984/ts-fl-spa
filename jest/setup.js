/* eslint-disable @typescript-eslint/no-var-requires */

// Fail tests on any warning
console.error = message => {
	throw new Error(message);
};
