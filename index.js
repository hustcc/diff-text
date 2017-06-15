/**
 * Created by xiaowei.wzw on 17/6/14.
 */

var DIFF_INSERT = 1;
var DIFF_DELETE = -1;
var DIFF_EQUAL = 0;

/**
 * Get the same substring at the start of strings.
 * @param originText
 * @param newText
 */
function prefixLength(originText, newText) {
  // Quick check for common null cases.
  if (!originText || !newText || originText.charCodeAt(0) !== newText.charCodeAt(0)) {
    return 0;
  }
  // Binary search.
  var pointerMin = 0;
  var pointerMax = Math.min(originText.length, newText.length);
  var pointerMid = pointerMax;
  var pointerStart = 0;
  while (pointerMin < pointerMid) {
    if (originText.substring(pointerStart, pointerMid) === newText.substring(pointerStart, pointerMid)) {
      pointerMin = pointerMid;
      pointerStart = pointerMin;
    } else {
      pointerMax = pointerMid;
    }
    pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  }
  return pointerMid;
}

/**
 * Get the same substring at the end of strings.
 * @param originText
 * @param newText
 * @returns {number}
 */
function suffixLength(originText, newText) {
  // Quick check for common null cases.
  if (!originText || !newText || originText.charCodeAt(originText.length - 1) !==
    newText.charCodeAt(newText.length - 1)) {
    return 0;
  }
  // Binary search.
  var pointerMin = 0;
  var pointerMax = Math.min(originText.length, newText.length);
  var pointerMid = pointerMax;
  var pointerEnd = 0;
  while (pointerMin < pointerMid) {
    if (originText.substring(originText.length - pointerMid, originText.length - pointerEnd) ===
      newText.substring(newText.length - pointerMid, newText.length - pointerEnd)) {
      pointerMin = pointerMid;
      pointerEnd = pointerMin;
    } else {
      pointerMax = pointerMid;
    }
    pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  }
  return pointerMid;
}

/**
 * add prefix, suffix diff information into diff.
 * @param diff
 * @param prefix
 * @param suffix
 * @returns {*}
 */
function addPrefixSuffix(diff, prefix, suffix) {
  // at last. then add the common prefix / suffix at the start / end.
  if (prefix) {
    diff.unshift([DIFF_EQUAL, prefix]);
  }
  if (suffix) {
    diff.push([DIFF_EQUAL, suffix]);
  }
  return diff;
}

/**
 * 处理 diff
 * @param originText
 * @param newText
 * @returns {*}
 */
function processDiffText(originText, newText) {
  // 1. when Singular Insertion/Deletion
  if (!originText && !newText) {
    // when Equality
    return [];
  } else {
    if (!originText) {
      // Just add some text.
      return [[DIFF_INSERT, newText]]
    }
    if (!newText) {
      // Just delete some text.
      return [[DIFF_DELETE, originText]];
    }
  }

  // 2. when Two Edits: two simple insertions or two simple deletions
  var longText = originText.length >= newText.length ? originText : newText;
  var shortText = originText.length >= newText.length ? newText : originText;

  var i = longText.indexOf(shortText);

  if (i !== -1) {
    var what = originText.length > newText.length ? DIFF_DELETE : DIFF_INSERT;
    // if Shorter text is inside the longer text.
    return [
      [what, longText.substring(0, i)],
      [DIFF_EQUAL, shortText],
      [what, longText.substring(i + shortText.length)]
    ];
  }
  // not inside
  return [
    [DIFF_DELETE, originText],
    [DIFF_INSERT, newText]
  ];
}


/**
 * Main entry. Get the diff information.
 * @param originText
 * @param newText
 * @returns {Array}
 */
function diffText(originText, newText) {
  if (originText == null || newText == null) {
    throw new Error('Text should not be null.')
  }

  // 1 when Equality
  if (originText === '' && newText === '') {
    return [];
  }

  // 2 remove Common Prefix/Suffix
  var prefixLen = prefixLength(originText, newText);
  var prefix = originText.substring(0, prefixLen);
  originText = originText.substring(prefixLen);
  newText = newText.substring(prefixLen);

  var suffixLen = suffixLength(originText, newText);
  var suffix = originText.substring(originText.length - suffixLen);
  originText = originText.substring(0, originText.length - suffixLen);
  newText = newText.substring(0, newText.length - suffixLen);

  // process diff text
  var diff = processDiffText(originText, newText);

  // add prefix and suffix.
  return addPrefixSuffix(diff, prefix, suffix);
}

module.exports = diffText;
