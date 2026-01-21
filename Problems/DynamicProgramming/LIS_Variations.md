# Longest Increasing Subsequence (LIS) - Variations

## Overview
The Longest Increasing Subsequence is a foundational DP problem that appears in array, string, and sequence questions. It tests recognition of **optimal substructure** (best ending at `i`) and **overlapping subproblems** (reuse best solutions on prefixes). Classic follow-ups ask for reconstruction, counting distinct LIS, or adapting to similar patterns like Longest Decreasing / Bitonic subsequences.

---

## 1. Core Problem
Given an integer array `nums`, find the length of the longest **strictly increasing** subsequence (not necessarily contiguous).

- **Constraints**: Typically `1 ≤ n ≤ 1e5`, values can be negative/positive, duplicates allowed.
- **Outputs**: Length is common; some variants ask for one valid sequence or the count of distinct LIS.

### When to Recognize LIS
- Need "ordered picks" from left to right without reordering.
- You can either take the current element or skip it, and the choice depends on the previous picked value.
- Follow-ups about "bitonic" (increase then decrease) or "envelopes/dolls" often reduce to LIS on a transformed array.

---

## 2. Approaches and Complexities
| Approach | Idea | Time | Space |
| --- | --- | --- | --- |
| Quadratic DP | `dp[i] = 1 + max(dp[j])` for `j < i` and `nums[j] < nums[i]` | $O(n^2)$ | $O(n)$ |
| Patience Sorting (Greedy + Binary Search) | Maintain `tails[len]` = smallest tail for an LIS of length `len+1`; binary search for placement | $O(n \log n)$ | $O(n)$ |
| Reconstruction (with Patience) | Track predecessor indices per length layer, then backtrack from the last layer | $O(n \log n)$ | $O(n)$ |
| Count # of LIS | Keep `(length, count)` per index; sum counts for max length | $O(n^2)$ | $O(n)$ |

---

## 3. Visualization (Patience Sorting Intuition)
Array: `[10, 9, 2, 5, 3, 7, 101, 18]`

```
Step | Place  | Tails after step (smallest tail for each length)
-----+--------+-----------------------------------------------
10   | new 10 | [10]
9    | rep 10 | [9]
2    | rep 9  | [2]
5    | append | [2, 5]
3    | rep 5  | [2, 3]
7    | append | [2, 3, 7]
101  | append | [2, 3, 7, 101]
18   | rep101 | [2, 3, 7, 18]
```

- Length of `tails` = LIS length = 4.
- Replacements keep tails minimal so future numbers can extend longer chains.

To reconstruct one LIS, track the index used at each length and a `prev` pointer per element (implemented below).

---

## 4. Python Implementations
```python
import bisect
from typing import List, Tuple

def lis_length(nums: List[int]) -> int:
    """Length using patience sorting (O(n log n))."""
    tails = []
    for x in nums:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)

def lis_sequence(nums: List[int]) -> List[int]:
    """Return one LIS sequence (O(n log n))."""
    if not nums:
        return []
    tails: List[int] = []          # tail values per length
    tails_idx: List[int] = []      # index of tail in nums per length
    prev = [-1] * len(nums)        # predecessor index for reconstruction

    for i, x in enumerate(nums):
        j = bisect.bisect_left(tails, x)
        if j == len(tails):
            tails.append(x)
            tails_idx.append(i)
        else:
            tails[j] = x
            tails_idx[j] = i
        prev[i] = tails_idx[j - 1] if j > 0 else -1

    k = tails_idx[-1]
    seq = []
    while k != -1:
        seq.append(nums[k])
        k = prev[k]
    return seq[::-1]

def count_lis(nums: List[int]) -> Tuple[int, int]:
    """Return (length, number of LIS) in O(n^2)."""
    n = len(nums)
    if n == 0:
        return 0, 0
    length = [1] * n
    ways = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                if length[j] + 1 > length[i]:
                    length[i] = length[j] + 1
                    ways[i] = ways[j]
                elif length[j] + 1 == length[i]:
                    ways[i] += ways[j]
    best = max(length)
    total = sum(ways[i] for i in range(n) if length[i] == best)
    return best, total

def demo():
    nums = [10, 9, 2, 5, 3, 7, 101, 18]
    print("Length:", lis_length(nums))                 # 4
    print("One LIS:", lis_sequence(nums))              # [2, 3, 7, 18]
    print("Length & count:", count_lis(nums))         # (4, 2)

if __name__ == "__main__":
    demo()
```

---

## 5. Node.js Implementations
```javascript
function lisLength(nums) {
    const tails = [];
    for (const x of nums) {
        // Binary search for the first >= x
        let l = 0, r = tails.length;
        while (l < r) {
            const m = (l + r) >> 1;
            if (tails[m] < x) l = m + 1; else r = m;
        }
        if (l === tails.length) tails.push(x); else tails[l] = x;
    }
    return tails.length;
}

function lisSequence(nums) {
    if (nums.length === 0) return [];
    const tails = [];
    const tailsIdx = [];
    const prev = Array(nums.length).fill(-1);

    nums.forEach((x, i) => {
        let l = 0, r = tails.length;
        while (l < r) {
            const m = (l + r) >> 1;
            if (tails[m] < x) l = m + 1; else r = m;
        }
        if (l === tails.length) {
            tails.push(x);
            tailsIdx.push(i);
        } else {
            tails[l] = x;
            tailsIdx[l] = i;
        }
        prev[i] = l > 0 ? tailsIdx[l - 1] : -1;
    });

    let k = tailsIdx[tailsIdx.length - 1];
    const seq = [];
    while (k !== -1) {
        seq.push(nums[k]);
        k = prev[k];
    }
    return seq.reverse();
}

// Example
const sample = [0, 1, 0, 3, 2, 3];
console.log(lisLength(sample));   // 4
console.log(lisSequence(sample)); // [0, 1, 2, 3]
```

---

## 6. Common Variations
- **LDS (Longest Decreasing Subsequence)**: Run LIS on negated values or reversed comparisons.
- **Bitonic (mountain) subsequence**: LIS forward + LIS on reversed array for peaks.
- **Russian Dolls / Envelopes**: Sort by first key asc, second key desc, then LIS on the second key.
- **"Minimum removals" to sort**: `n - LIS length` operations.
- **K-increasing/K-decreasing array**: Ensure each residue class mod `k` is non-decreasing via LIS on slices.

---

## 7. Practice Prompts
1. Find one LIS sequence and its length for `[4,10,4,3,8,9]`.
2. Given envelopes `(w, h)`, compute the max nesting count.
3. Find the minimum deletions to make an array strictly increasing.
4. Count the number of distinct LIS in `[1,3,5,4,7]`.
