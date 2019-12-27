module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	setupFiles: ['<rootDir>/jest/setup.js'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
		'^components(.*)$': '<rootDir>/src/components$1',
		'^common(.*)$': '<rootDir>/src/components/common$1',
		'^shared(.*)$': '<rootDir>/src/components/shared$1',
		'^ducks(.*)$': '<rootDir>/src/ducks$1',
		'^api(.*)$': '<rootDir>/src/api$1',
		'^models(.*)$': '<rootDir>/src/models$1',
		'^helpers(.*)$': '<rootDir>/src/helpers$1',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	snapshotResolver: '<rootDir>/jest/snapshotResolver.js',
};
