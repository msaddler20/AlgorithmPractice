const readline = require("readline");

class SlidingWindow {
  getMaxSum = () =>
    this._slidingWindowMaxSum(
      [2, 6, 9, 2, 1, 11, 5, 5, 3, 16, 7, 8, 4, 5, 2, 3, 6, 7, 5, 23],
      3
    );
  runSearch = () => {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this._promptUser();
  };

  // Finds a string in another string using sliding window.
  _slidingWindow = (str1, search, start) => {
    if (!start) start = 0;

    let strLen = str1.length;
    let searchLength = search.length;

    if (strLen < searchLength) return false;

    while (start < strLen && start + searchLength < strLen && !found) {
      var subs = str1.substring(start, start + searchLength);
      if (subs == search) {
        return true;
      }
      return this._slidingWindow(str1, search, ++start);
    }

    return false;
  };

  // Get the max sum for sub array using sliding window.
  _slidingWindowMaxSum = (arr, num, start, maxSum, tempSum) => {
    if (arr.length < num) return null;
    if (!maxSum) maxSum = 0;
    if (!tempSum) tempSum = 0;
    if (!start) start = 0;

    while (start < arr.length) {
      for (let i = start; i < start + num; i++) {
        tempSum += arr[i];
      }

      if (tempSum > maxSum) maxSum = tempSum;

      let leftOver = arr.length - start;

      if (leftOver > 0) {
        let toGet = leftOver < num ? leftOver : num;
        return this._slidingWindowMaxSum(arr, toGet, ++start, maxSum, 0);
      }
    }

    return maxSum;
  };

  _strBank = "this is a test string.";
  _promptUser = () => {
    let _this = this;
    this._rl.question("Enter search term:  ", function (search) {
      var found = _this._slidingWindow(_this._strBank, search);

      if (!found) {
        console.log("Not found!\n");
        return _this._promptUser();
      } else {
        console.log(`Found match!  ${_this._strBank}\n`);
        process.exit(0);
      }
    });
  };
}

module.exports = SlidingWindow;
