const C0_C1_CONTROL_RANGES = "\\u0000-\\u001F\\u007F-\\u009F" as const;

export const DISPLAY_TEXT_CONTRACT = {
	controlRanges: C0_C1_CONTROL_RANGES,
	// Lookaround-free equivalent of `^(?![\s\S]*[R])[\s\S]+$` (negative lookahead is
	// rejected by some OpenAI-compatible providers: [invalid_json_schema] regex
	// lookaround is not supported). `^[^R]+$` has identical semantics: the whole
	// string contains no character from R.
	pattern: `^[^${C0_C1_CONTROL_RANGES}]+$`,
} as const;

const DISPLAY_TEXT_CONTROL_PATTERN = new RegExp(`[${DISPLAY_TEXT_CONTRACT.controlRanges}]`, "u");

export function hasDisplayControlCharacters(value: string): boolean {
	return DISPLAY_TEXT_CONTROL_PATTERN.test(value);
}
