Fenwick Tree (Binary Indexed Tree) Implementation
A Fenwick Tree or Binary Indexed Tree (BIT) is a highly efficient data structure used for providing O(logN) time complexity for both point updates and prefix sum queries. This makes it significantly faster than a standard array for dynamic frequency tables or cumulative frequency scenarios.

🚀 Key Features
Point Update: Add a value to an element in O(logN).

Prefix Sum: Calculate the sum of elements from the start to index i in O(logN).

Memory Efficient: Uses O(N) space (identical to a standard array).

Zero Overhead: Ideal for competitive programming and high-performance data pipelines.

🛠️ Logic & LSB
The Fenwick Tree relies on the Least Significant Bit (LSB) to manage range responsibilities.

The formula to find the LSB is: i & (-i)

To Update: We climb up the tree by adding the LSB to the current index.

To Query: We climb down the tree by subtracting the LSB from the current index.

💻 Implementations
Python Version

Python's set() and integers are flexible, making this implementation very readable.

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

# Example Usage
nums = [1, 7, 3, 0, 5, 8]
bit = FenwickTree(len(nums))
for idx, val in enumerate(nums, 1):
    bit.update(idx, val)

print(f"Prefix sum of first 3: {bit.query(3)}") # Output: 11
Node.js Version

For Node.js, we use TypedArrays (Int32Array). This is crucial to prevent SIGKILL or Out of Memory errors when working with large datasets (100k+ elements), as it allocates memory outside the standard V8 garbage-collected heap.

JavaScript
/**
 * Fenwick Tree (Binary Indexed Tree)
 * Optimized for Node.js using TypedArrays
 */
class FenwickTree {
    constructor(n) {
        this.size = n;
        // Using Int32Array for better memory performance and to avoid OOM
        this.tree = new Int32Array(n + 1);
    }

    /**
     * Adds delta to the element at index i
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
     * Returns the prefix sum up to index i
     * @param {number} i - 1-based index
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
     * Returns the sum for a specific range
     */
    queryRange(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

// Example Usage
const bit = new FenwickTree(6);
[1, 7, 3, 0, 5, 8].forEach((val, idx) => bit.update(idx + 1, val));
console.log(`Prefix sum of first 3: ${bit.query(3)}`); // Output: 11
⚠️ Performance Notes (Avoid SIGKILL)
When implementing data structures in Node.js for heavy workloads:

Prefer TypedArrays: Use Int32Array or Float64Array instead of standard [] to keep memory footprint predictable.

Bitwise Operations: The i & -i operation is extremely fast in both V8 (Node.js) and Python.

Memory Limits: If you process arrays larger than 10 million elements, run Node with:

Bash
node --max-old-space-size=4096 your_file.js
