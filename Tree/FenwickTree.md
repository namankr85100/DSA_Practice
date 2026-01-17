Fenwick Tree (Binary Indexed Tree) Implementation
A Fenwick Tree (also known as a Binary Indexed Tree) is a data structure that provides a perfect balance between static prefix sums and dynamic array updates.

❓ Why We Need This
To understand why we need a Fenwick Tree, we must look at the trade-offs between other common approaches when dealing with an array of N elements:

1. The Simple Array Approach

If you store data in a standard array:

Update an element: O(1) — Very fast.

Get a range sum: O(N) — Very slow for large arrays, as you must loop through every element.

Best for: Frequent updates, rare queries.

2. The Prefix Sum Approach

If you store a pre-calculated running total:

Get a range sum: O(1) — Very fast (just subtract two numbers).

Update an element: O(N) — Very slow, as you must update every subsequent prefix sum.

Best for: Frequent queries, rare updates (static data).

3. The Fenwick Tree (The Solution)

The Fenwick Tree provides a middle ground that is "Fast at Everything":

Update an element: O(logN)

Get a range sum: O(logN)

Best for: Dynamic data where numbers are changing frequently, and you need to calculate sums or frequencies in real-time without hitting Out of Memory or Time Limit Exceeded errors.

🛠️ Logic & LSB
The efficiency of a Fenwick Tree comes from the Least Significant Bit (LSB) logic. Each node at index i is responsible for a range of elements determined by the last set bit in the binary representation of i.

LSB Formula: i & (-i)

Update (Climb Up): Move to the next node by adding LSB.

Query (Climb Down): Move to the parent node by subtracting LSB.

💻 Implementations
Python

Python’s integer handling makes the BIT implementation concise and safe for competitive programming.

Python
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

# Example
nums = [1, 7, 3, 0, 5, 8]
bit = FenwickTree(len(nums))
for idx, val in enumerate(nums, 1):
    bit.update(idx, val)

print(f"Prefix sum of first 3 elements: {bit.query(3)}") # Output: 11
Node.js

In Node.js, using Int32Array is a best practice for this structure. It allocates a contiguous block of memory, which is significantly faster and more memory-efficient than a standard Javascript Array [], helping prevent SIGKILL errors on large datasets.

JavaScript
/**
 * Fenwick Tree (Binary Indexed Tree)
 * Optimized for Node.js using TypedArrays for memory efficiency.
 */
class FenwickTree {
    constructor(n) {
        this.size = n;
        // TypedArrays are stored outside the V8 heap, reducing OOM/SIGKILL risk
        this.tree = new Int32Array(n + 1);
    }

    /**
     * @param {number} i - 1-based index
     * @param {number} delta - value to add
     */
    update(i, delta) {
        while (i <= this.size) {
            this.tree[i] += delta;
            i += i & -i;
        }
    }

    /**
     * @param {number} i - 1-based index
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

    queryRange(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

// Example Usage
const bit = new FenwickTree(6);
[1, 7, 3, 0, 5, 8].forEach((val, idx) => bit.update(idx + 1, val));
console.log(`Prefix sum of first 3 elements: ${bit.query(3)}`); // Output: 11
⚡ Performance Summary
Operation	Array	Prefix Sum	Fenwick Tree
Update	O(1)	O(N)	O(logN)
Range Sum	O(N)	O(1)	O(logN)
Space	O(N)	O(N)	O(N)
