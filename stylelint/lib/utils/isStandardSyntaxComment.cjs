// NOTICE: This file is generated by Rollup. To modify it,
// please instead edit the ESM counterpart and rebuild with Rollup (npm run build).
'use strict';

/**
 * @param {import('postcss').Comment} comment
 * @returns {boolean}
 */
function isStandardSyntaxComment(comment) {
	// We check both here because the Sass parser uses `raws.inline` to indicate
	// inline comments, while the Less parser uses `inline`.
	if ('inline' in comment) return false;

	if ('inline' in comment.raws) return false;

	return true;
}

module.exports = isStandardSyntaxComment;
