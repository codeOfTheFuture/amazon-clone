import { RandomUUIDOptions } from "crypto";
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { enableFetchMocks } from "jest-fetch-mock";
import crypto from "crypto";

enableFetchMocks();

Object.defineProperty(global, "crypto", {
	value: {
		randomUUID: (string: RandomUUIDOptions) => crypto.randomUUID(string),
	},
});
