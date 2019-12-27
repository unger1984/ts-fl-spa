// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve, join } = require('path');

const rootDir = resolve(__dirname, '..');
const srcDir = join(rootDir, 'src');
const testDir = join(rootDir, '__test__');
const snapDir = join(testDir, 'snapshots');

module.exports = {
	resolveSnapshotPath: (testPath, snapshotExtension) => {
		const result = testPath.replace(srcDir, snapDir).replace(/\.spec\.(ts|tsx|js|jsx)$/, '.$1') + snapshotExtension;
		return result;
	},

	resolveTestPath: (snapshotFilePath, snapshotExtension) => {
		const result = snapshotFilePath
			.replace(snapDir, srcDir)
			.slice(0, -snapshotExtension.length)
			.replace(/\.(ts|tsx|js|jsx)$/, '.spec.$1');
		return result;
	},

	testPathForConsistencyCheck: 'some/example.spec.tsx',
};
