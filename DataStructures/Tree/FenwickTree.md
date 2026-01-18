# Fenwick Tree (Binary Indexed Tree) Implementation

A Fenwick Tree (also known as a Binary Indexed Tree) is a data structure that provides a perfect balance between static prefix sums and dynamic array updates.

---

## ❓ Why We Need This?

To understand why we need a Fenwick Tree, let's compare three common approaches:

### 1️⃣ Simple Array Approach

| Operation | Complexity | Remark |
|-----------|-----------|--------|
| Update element | O(1) ✅ | Very fast |
| Get range sum | O(N) ❌ | Very slow for large arrays |

**Best for:** Frequent updates, rare queries

---

### 2️⃣ Prefix Sum Approach

| Operation | Complexity | Remark |
|-----------|-----------|--------|
| Get range sum | O(1) ✅ | Very fast |
| Update element | O(N) ❌ | Must rebuild all sums |

**Best for:** Frequent queries, rare/no updates (static data)

---

### 3️⃣ Fenwick Tree (Best of Both Worlds) ⭐

| Operation | Complexity | Remark |
|-----------|-----------|--------|
| Update element | O(log N) ✅ | Fast |
| Get range sum | O(log N) ✅ | Fast |

**Best for:** Dynamic data with frequent queries AND updates

---

## 🛠️ How It Works: LSB (Least Significant Bit) Logic

The magic of Fenwick Trees comes from using **LSB** to determine parent-child relationships.

### LSB Formula
```
LSB(i) = i & (-i)
```

**Example:** LSB(6) = `6 & (-6)` = `110 & 010` = `010` = `2`

### Two Core Operations

| Operation | Direction | Method |
|-----------|-----------|--------|
| **Update** | Go up tree | Add LSB: `i += i & (-i)` |
| **Query** | Go down tree | Subtract LSB: `i -= i & (-i)` |

---

## 💻 Implementation Examples

### Python Version

```python
class FenwickTree:
    def __init__(self, n):
        self.size = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        """Add delta to element at index i (1-based)"""
        while i <= self.size:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        """Get the prefix sum from 1 to i (1-based)"""
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def query_range(self, left, right):
        """Get sum between [left, right] inclusive"""
        return self.query(right) - self.query(left - 1)


# Example Usage
nums = [1, 7, 3, 0, 5, 8]
bit = FenwickTree(len(nums))

# Build tree
for idx, val in enumerate(nums, 1):
    bit.update(idx, val)

# Queries
print(f"Prefix sum of first 3: {bit.query(3)}")        # Output: 11
print(f"Range sum [2-4]: {bit.query_range(2, 4)}")     # Output: 10
```

---

### JavaScript/Node.js Version

Using `Int32Array` for memory efficiency on large datasets:

```javascript
/**
 * Fenwick Tree (Binary Indexed Tree)
 * Optimized for Node.js using TypedArrays
 */
class FenwickTree {
    constructor(n) {
        this.size = n;
        // TypedArrays allocate contiguous memory outside V8 heap
        // Prevents OOM/SIGKILL on large datasets
        this.tree = new Int32Array(n + 1);
    }

    /**
     * Add delta to element at index i (1-based indexing)
     * @param {number} i - Index to update
     * @param {number} delta - Value to add
     */
    update(i, delta) {
        while (i <= this.size) {
            this.tree[i] += delta;
            i += i & -i;
        }
    }

    /**
     * Get prefix sum from 1 to i (1-based indexing)
     * @param {number} i - Index
     * @returns {number} Prefix sum
     */
    query(i) {
        let sum = 0;
        while (i > 0) {
            sum += this.tree[i];
            i -= i & -i;
        }
        return sum;
    }

    /**
     * Get sum in range [l, r] inclusive
     * @param {number} l - Left boundary
     * @param {number} r - Right boundary
     * @returns {number} Range sum
     */
    queryRange(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

// Example Usage
const bit = new FenwickTree(6);
[1, 7, 3, 0, 5, 8].forEach((val, idx) => bit.update(idx + 1, val));

console.log(`Prefix sum of first 3: ${bit.query(3)}`);       // Output: 11
console.log(`Range sum [2-4]: ${bit.queryRange(2, 4)}`);     // Output: 10
```

---

## 📊 Visual Example

### Original Array
```
Index:  1  2  3  4  5  6
Value: [1, 7, 3, 0, 5, 8]
```

### Fenwick Tree Structure
```
Index:  1  2  3  4   5   6
Tree:  [1, 8, 3, 11, 5, 13]
```

### How Each Node Is Built

```
Tree[1] = arr[1] 
        = 1

Tree[2] = arr[1] + arr[2] 
        = 1 + 7 = 8

Tree[3] = arr[3] 
        = 3

Tree[4] = arr[1] + arr[2] + arr[3] + arr[4] 
        = 1 + 7 + 3 + 0 = 11

Tree[5] = arr[5] 
        = 5

Tree[6] = arr[5] + arr[6] 
        = 5 + 8 = 13
```

---

## ⚡ Performance Comparison

| Operation | Simple Array | Prefix Sum | Fenwick Tree | Segment Tree |
|-----------|--------------|-----------|--------------|--------------|
| Update | O(1) | O(N) | **O(log N)** ⭐ | O(log N) |
| Range Sum | O(N) | O(1) | **O(log N)** ⭐ | O(log N) |
| Space | O(N) | O(N) | O(N) | O(N) |
| Complexity | Very Easy | Easy | Moderate | Hard |

---

## 🎯 Practice Problems

### ⭐ Beginner

**1. Range Sum Query - Mutable** (LeetCode 307)
   - Given an array, handle point updates and range sum queries
   - Direct Fenwick Tree application
   - Difficulty: ⭐⭐

---

### ⭐⭐ Intermediate

**2. Count of Smaller Numbers After Self** (LeetCode 315)
   - Use Fenwick Tree for inversion counting
   - Complexity: O(n log n)
   - Difficulty: ⭐⭐⭐

**3. Reverse Pairs** (LeetCode 493)
   - Count pairs (i, j) where i < j and nums[i] > 2 * nums[j]
   - Advanced use with coordinate compression
   - Difficulty: ⭐⭐⭐⭐

---

### ⭐⭐⭐ Advanced

**4. Range Addition Query - Immutable** (LeetCode 308)
   - 2D version of range sum queries
   - Requires coordinate compression
   - Difficulty: ⭐⭐⭐⭐

---

## 🔍 Key Takeaways

✅ **LSB (i & -i)** is the core of Fenwick Tree efficiency

✅ **1-based indexing** is crucial for the binary trick to work

✅ **Middle ground** between simple arrays and segment trees

✅ **Easier to implement** than segment trees with same O(log N) complexity

✅ **Perfect for online queries** on dynamic arrays

✅ **Cache-friendly** due to sequential memory access

---

## ⚠️ Common Pitfalls

❌ **Using 0-based indexing** (breaks the LSB logic completely)

❌ **Forgetting tree stores cumulative sums**, not individual elements

❌ **Missing query(l-1)** for range queries (gives wrong answer)

❌ **Wrong data type** (using int when overflow happens)

---

## 🚀 Next Steps

1. Implement both versions (Python & JavaScript)
2. Trace through manual examples with visual guide
3. Solve LeetCode 307 first (straightforward)
4. Move to 315 & 493 for advanced techniques
5. Compare with Segment Trees for your use case
