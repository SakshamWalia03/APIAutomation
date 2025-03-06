import { expect } from "@playwright/test";
/**
 * String format function.
 * Replaces placeholders {0}, {1}, etc., with corresponding arguments.
 *
 * @param {string} str - The string to be formatted.
 * @param {...any} args - Values to replace placeholders in the string.
 * @returns {string} - Formatted string.
 */
export const stringFormat = (str, ...args) => str.replace(/{(\d+)}/g, (match, index) => args[index]?.toString() || "*");