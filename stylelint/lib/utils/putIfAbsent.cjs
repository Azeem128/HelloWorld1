// NOTICE: This file is generated by Rollup. To modify it,
// please instead edit the ESM counterpart and rebuild with Rollup (npm run build).
'use strict';

/**
 * If `map` already has the given `key`, returns its value. Otherwise, calls
 * `callback`, adds the result to `map` at `key`, and then returns it.
 *
 * @template K
 * @template V
 * @param {Map<K, V>} map
 * @param {K} key
 * @param {() => V} callback
 * @returns {V}
 */
function putIfAbsent(map, key, callback) {
	if (map.has(key)) return /** @type {V} */ (map.get(key));

	const value = callback();

	map.set(key, value);

	return value;
}

module.exports = putIfAbsent;
