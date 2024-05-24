// NOTICE: This file is generated by Rollup. To modify it,
// please instead edit the ESM counterpart and rebuild with Rollup (npm run build).
'use strict';

/**
 * @param {import('postcss').AtRule} atRule
 * @returns {string}
 */
function getAtRuleParams(atRule) {
	return atRule.raws.params?.raw ?? atRule.params;
}

module.exports = getAtRuleParams;
