# Segment Tree Implementation

A Segment Tree is a data structure that allows you to efficiently query and update ranges of an array, providing a perfect balance between flexibility and performance.

---

## ❓ Why We Need Segment Trees?

Segment Trees solve the problem of handling both **range queries** and **range updates** efficiently on large arrays.

### Comparison with Other Approaches

| Operation | Array | Prefix Sum | Fenwick Tree | Segment Tree |
|-----------|-------|-----------|--------------|--------------|
| Point Update | O(1) | O(N) | O(log N) | O(log N) |
| Range Sum | O(N) | O(1) | O(log N) | O(log N) |
| Range Update | O(N) | O(N) | ❌ | O(log N) ⭐ |
| Space | O(N) | O(N) | O(N) | O(2N) |
| Implementation | Easy | Easy | Moderate | Hard |

**Best for:** Range queries AND range updates simultaneously

---

## 🛠️ How Segment Tree Works

A Segment Tree is a **binary tree** where:
- Each **leaf node** represents an array element
- Each **internal node** represents an aggregate of its children (sum, min, max, etc.)
- The **root node** represents the aggregate of the entire array

### Tree Structure

For array `[1, 3, 5, 7, 9, 11]`:

```
                    [36]
               /            \
           [9]                [27]
          /   \              /    \
        [4]   [5]          [12]   [15]
       / \    / \          /  \    /  \
      [1][3][5][7]      [9][11]
      |  |  |  |  |  |
      1  3  5  7  9  11
```

- Leaf nodes: array elements
- Internal nodes: sum of children
- Root: sum of entire array

---

## 💻 Implementation Examples

### Python Version

```python
class SegmentTree:
    def __init__(self, arr):
        """Initialize segment tree with array"""
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)  # 4*n space for complete binary tree
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        """Build the segment tree recursively"""
        if start == end:
            # Leaf node
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2
            
            # Recursively build left and right subtrees
            self._build(arr, left_child, start, mid)
            self._build(arr, right_child, mid + 1, end)
            
            # Combine results
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

    def update(self, idx, value):
        """Update element at index to new value"""
        self._update(idx, value, 0, 0, self.n - 1)

    def _update(self, idx, value, node, start, end):
        """Update recursively"""
        if start == end:
            self.tree[node] = value
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2
            
            if idx <= mid:
                self._update(idx, value, left_child, start, mid)
            else:
                self._update(idx, value, right_child, mid + 1, end)
            
            # Update parent
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

    def range_query(self, l, r):
        """Query sum from index l to r (inclusive)"""
        return self._query(l, r, 0, 0, self.n - 1)

    def _query(self, l, r, node, start, end):
        """Query recursively"""
        # No overlap
        if r < start or end < l:
            return 0
        
        # Complete overlap
        if l <= start and end <= r:
            return self.tree[node]
        
        # Partial overlap
        mid = (start + end) // 2
        left_child = 2 * node + 1
        right_child = 2 * node + 2
        
        left_sum = self._query(l, r, left_child, start, mid)
        right_sum = self._query(l, r, right_child, mid + 1, end)
        
        return left_sum + right_sum


# Example Usage
arr = [1, 3, 5, 7, 9, 11]
st = SegmentTree(arr)

# Queries
print(f"Sum [0, 2]: {st.range_query(0, 2)}")        # Output: 9 (1+3+5)
print(f"Sum [1, 4]: {st.range_query(1, 4)}")        # Output: 24 (3+5+7+9)

# Update
st.update(2, 10)  # Change arr[2] from 5 to 10
print(f"Sum [0, 2] after update: {st.range_query(0, 2)}")  # Output: 14 (1+3+10)
```

---

### JavaScript/Node.js Version

```javascript
/**
 * Segment Tree Implementation
 * Supports point updates and range sum queries
 */
class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(0);
        this._build(arr, 0, 0, this.n - 1);
    }

    /**
     * Build segment tree recursively
     * @private
     */
    _build(arr, node, start, end) {
        if (start === end) {
            // Leaf node
            this.tree[node] = arr[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;

            // Recursively build left and right subtrees
            this._build(arr, leftChild, start, mid);
            this._build(arr, rightChild, mid + 1, end);

            // Combine results
            this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
        }
    }

    /**
     * Update element at index to new value
     * @param {number} idx - Index to update
     * @param {number} value - New value
     */
    update(idx, value) {
        this._update(idx, value, 0, 0, this.n - 1);
    }

    /**
     * Update recursively
     * @private
     */
    _update(idx, value, node, start, end) {
        if (start === end) {
            this.tree[node] = value;
        } else {
            const mid = Math.floor((start + end) / 2);
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;

            if (idx <= mid) {
                this._update(idx, value, leftChild, start, mid);
            } else {
                this._update(idx, value, rightChild, mid + 1, end);
            }

            // Update parent
            this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
        }
    }

    /**
     * Query sum from index l to r (inclusive)
     * @param {number} l - Left boundary
     * @param {number} r - Right boundary
     * @returns {number} Range sum
     */
    rangeQuery(l, r) {
        return this._query(l, r, 0, 0, this.n - 1);
    }

    /**
     * Query recursively
     * @private
     */
    _query(l, r, node, start, end) {
        // No overlap
        if (r < start || end < l) {
            return 0;
        }

        // Complete overlap
        if (l <= start && end <= r) {
            return this.tree[node];
        }

        // Partial overlap
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;

        const leftSum = this._query(l, r, leftChild, start, mid);
        const rightSum = this._query(l, r, rightChild, mid + 1, end);

        return leftSum + rightSum;
    }
}

// Example Usage
const arr = [1, 3, 5, 7, 9, 11];
const st = new SegmentTree(arr);

// Queries
console.log(`Sum [0, 2]: ${st.rangeQuery(0, 2)}`);        // Output: 9 (1+3+5)
console.log(`Sum [1, 4]: ${st.rangeQuery(1, 4)}`);        // Output: 24 (3+5+7+9)

// Update
st.update(2, 10);  // Change arr[2] from 5 to 10
console.log(`Sum [0, 2] after update: ${st.rangeQuery(0, 2)}`);  // Output: 14 (1+3+10)
```

---

## 📊 Visual Example

### Original Array
```
Index:  0  1  2  3  4  5
Value: [1, 3, 5, 7, 9, 11]
```

### Segment Tree Structure

```
                    [36]           (sum: 1+3+5+7+9+11)
                   /    \
                 /        \
              [9]          [27]    (left: 1+3+5, right: 7+9+11)
             /   \        /   \
           [4]   [5]    [7]   [20]  
          / \    / \    / \    / \
        [1][3] [5][7] [9][11]
```

### Step-by-Step Query [1, 4]

```
Query: rangeQuery(1, 4)

1. Start at root [36]
   - Partial overlap: [0-5] overlaps [1-4]

2. Go to left child [9] (covers 0-2)
   - Partial overlap: [0-2] overlaps [1-4]

3. Go to left child [4] (covers 0-1)
   - Partial overlap: [0-1] overlaps [1-4]

4. Go to right child [3] (covers 1)
   - Complete overlap: [1-1] ⊆ [1-4] → Add 3

5. Go back and check right child [5] (covers 2)
   - Complete overlap: [2-2] ⊆ [1-4] → Add 5

6. Go to right child [27] (covers 3-5)
   - Partial overlap: [3-5] overlaps [1-4]

7. Go to left child [7] (covers 3)
   - Complete overlap: [3-3] ⊆ [1-4] → Add 7

8. Go to right child [20] (covers 4-5)
   - Partial overlap: [4-5] overlaps [1-4]

9. Go to left child [9] (covers 4)
   - Complete overlap: [4-4] ⊆ [1-4] → Add 9

Result: 3 + 5 + 7 + 9 = 24 ✅
```

---

## ⚡ Time Complexity

| Operation | Time | Space |
|-----------|------|-------|
| **Build** | O(N) | O(4N) |
| **Point Update** | O(log N) | - |
| **Range Query** | O(log N) | - |
| **Range Update** | O(log N) * | - |

*With lazy propagation

---

## 🎯 Types of Segment Trees

### 1. Sum Segment Tree
- Each node stores sum of its children
- Used for: Range sum queries

### 2. Min/Max Segment Tree
- Each node stores min/max of its children
- Used for: Range min/max queries

### 3. With Lazy Propagation
- Supports efficient range updates
- Used for: Multiple range updates and queries

---

## 🎓 Practice Problems

### ⭐ Beginner

**1. Range Sum Query - Immutable** (LeetCode 303)
   - Static array, no updates
   - Good introduction to segment trees
   - Difficulty: ⭐⭐

### ⭐⭐ Intermediate

**2. Range Sum Query - Mutable** (LeetCode 307)
   - Point updates and range queries
   - Core segment tree problem
   - Difficulty: ⭐⭐⭐

**3. The Skyline Problem** (LeetCode 218)
   - Complex range queries
   - Difficulty: ⭐⭐⭐⭐

### ⭐⭐⭐ Advanced

**4. Range Module** (LeetCode 715)
   - Range updates and queries
   - With lazy propagation
   - Difficulty: ⭐⭐⭐⭐

**5. Fallingworms** (SPOJ)
   - Multiple operations on ranges
   - Difficulty: ⭐⭐⭐⭐

---

## 📋 Segment Tree vs Other Structures

| Feature | Array | Fenwick Tree | Segment Tree |
|---------|-------|--------------|--------------|
| **Point Update** | O(1) | O(log N) | O(log N) |
| **Range Query** | O(N) | O(log N) | O(log N) |
| **Range Update** | O(N) | ❌ | O(log N)* |
| **Flexible** | ❌ | Limited | ✅ Very |
| **Easy to Code** | ✅ | Moderate | Hard |
| **Space** | O(N) | O(N) | O(4N) |

---

## 🔍 Key Points

✅ **Divide and Conquer approach** divides array into segments recursively

✅ **Binary Tree structure** enables O(log N) operations

✅ **Space efficient** uses array indexing (no pointers needed)

✅ **Flexible** can be adapted for different operations (sum, min, max, etc.)

✅ **Lazy propagation** makes range updates efficient

✅ **More complex** than Fenwick Tree but more powerful

---

## ⚠️ Common Pitfalls

❌ **Wrong tree size** - Use 4*N space for safety

❌ **Off-by-one errors** - Be careful with boundary conditions

❌ **Forgetting to propagate** - Update parent after child changes

❌ **Integer overflow** - Use long long for large sums

❌ **Wrong merge operation** - Ensure operation is associative

---

## 🚀 Next Steps

1. Implement basic sum segment tree (Python or JS)
2. Test with manual examples
3. Solve LeetCode 307 (most straightforward)
4. Learn lazy propagation for range updates
5. Practice advanced problems with multiple operations

---

## 💡 Tips for Implementation

- **Use 1-based indexing** for cleaner math (optional)
- **Store node index = 2*leftChild + 1** for array representation
- **Always update parent** after updating children
- **Handle base case** (start == end) separately
- **Be careful with ranges** - use (start, end) inclusive
