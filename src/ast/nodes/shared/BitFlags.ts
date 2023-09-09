export const enum Flag {
	included = 0b0000_0000_0000_0000_0000_0000_0000_0001,
	deoptimized = 0b0000_0000_0000_0000_0000_0000_0000_0010,
	tdzAccessDefined = 0b0000_0000_0000_0000_0000_0000_0000_0100,
	tdzAccess = 0b0000_0000_0000_0000_0000_0000_0000_1000,
	assignmentDeoptimized = 0b0000_0000_0000_0000_0000_0000_0001_0000,
	bound = 0b0000_0000_0000_0000_0000_0000_0010_0000,
	isUndefined = 0b0000_0000_0000_0000_0000_0000_0100_0000,
	optional = 0b0000_0000_0000_0000_0000_0000_1000_0000,
	async = 0b0000_0000_0000_0000_0000_0001_0000_0000,
	deoptimizedReturn = 0b0000_0000_0000_0000_0000_0010_0000_0000,
	computed = 0b0000_0000_0000_0000_0000_0100_0000_0000,
	hasLostTrack = 0b0000_0000_0000_0000_0000_1000_0000_0000,
	hasUnknownDeoptimizedInteger = 0b0000_0000_0000_0000_0001_0000_0000_0000,
	hasUnknownDeoptimizedProperty = 0b0000_0000_0000_0000_0010_0000_0000_0000,
	directlyIncluded = 0b0000_0000_0000_0000_0100_0000_0000_0000,
	deoptimizeBody = 0b0000_0000_0000_0000_1000_0000_0000_0000,
	isBranchResolutionAnalysed = 0b0000_0000_0000_0001_0000_0000_0000_0000,
	await = 0b0000_0000_0000_0010_0000_0000_0000_0000,
	method = 0b0000_0000_0000_0100_0000_0000_0000_0000,
	shorthand = 0b0000_0000_0000_1000_0000_0000_0000_0000,
	tail = 0b0000_0000_0001_0000_0000_0000_0000_0000,
	prefix = 0b0000_0000_0010_0000_0000_0000_0000_0000
}

export function setFlag(oldFlag: number, mask: Flag, value: boolean): number {
	// This is a branchless version of the following code:
	// return value ? (oldFlag | mask) : (oldFlag & ~mask);
	//
	// I profiled these variants, and there was essentially no difference in performance, however,
	// the branchless version apparently is more likely to be inlined by v8 and the ternary version
	// was giving me issues with maximum call stack size exceeded errors.
	//
	// Note: booleans convert to 1 / 0 in javascript, but we want -1 / 0 since -1 is all bits set
	// that is why we use -value in the below code.
	return (oldFlag & ~mask) | (-value & mask);
}

export function isFlagSet(flag: number, mask: Flag): boolean {
	return (flag & mask) !== 0;
}
