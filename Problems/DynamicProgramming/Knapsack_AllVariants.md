# Knapsack Problem - All Variants

## Overview
The Knapsack problem is a classic optimization problem in computer science and operations research. Different variants exist to model real-world scenarios where resources must be allocated optimally.

---

## 1. 0/1 Knapsack Problem

### Description
Given N items, each with a weight and value, select items to maximize total value without exceeding the knapsack's capacity. **Each item can be taken at most once.**

### Real-World Applications
- **Resource Allocation**: Budget allocation where each project can be funded or not
- **Cargo Loading**: Loading containers on ships/trucks where items can't be split
- **Investment Portfolio**: Selecting from investment opportunities with limited capital
- **Memory Management**: Selecting processes to load in limited RAM

### Time Complexity
- **DP Solution**: O(N × W) where N = number of items, W = capacity
- **Space Complexity**: O(N × W) or O(W) with optimization

### Python Implementation
```python
def knapsack_01(weights, values, capacity):
    """
    0/1 Knapsack - Dynamic Programming Solution
    
    Args:
        weights: List of item weights
        values: List of item values
        capacity: Maximum knapsack capacity
    
    Returns:
        Maximum value achievable
    """
    n = len(weights)
    # Create DP table: dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't include current item
            dp[i][w] = dp[i-1][w]
            
            # Include current item if it fits
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1])
    
    return dp[n][capacity]


def knapsack_01_optimized(weights, values, capacity):
    """
    Space-optimized version using 1D array
    """
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # Traverse from right to left to avoid overwriting needed values
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]


def knapsack_01_with_items(weights, values, capacity):
    """
    Returns both max value and selected items
    """
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    # Build DP table
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                              dp[i-1][w - weights[i-1]] + values[i-1])
    
    # Backtrack to find selected items
    selected_items = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            selected_items.append(i-1)
            w -= weights[i-1]
    
    return dp[n][capacity], selected_items[::-1]


# Example usage
if __name__ == "__main__":
    weights = [2, 3, 4, 5]
    values = [3, 4, 5, 6]
    capacity = 8
    
    max_value = knapsack_01(weights, values, capacity)
    print(f"0/1 Knapsack Max Value: {max_value}")
    
    max_value_opt = knapsack_01_optimized(weights, values, capacity)
    print(f"Optimized Max Value: {max_value_opt}")
    
    max_value, items = knapsack_01_with_items(weights, values, capacity)
    print(f"Selected items (indices): {items}, Value: {max_value}")
```

**Visual Example:**

```
Items: weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 8

┌─────────────────────────────────────────────────────────┐
│ Item 0: weight=2, value=3, ratio=1.5  [▓▓ → $3]       │
│ Item 1: weight=3, value=4, ratio=1.33 [▓▓▓ → $4]      │
│ Item 2: weight=4, value=5, ratio=1.25 [▓▓▓▓ → $5]     │
│ Item 3: weight=5, value=6, ratio=1.2  [▓▓▓▓▓ → $6]    │
└─────────────────────────────────────────────────────────┘

DP Table (rows=items, cols=capacity):

        Capacity →
      0  1  2  3  4  5  6  7  8
    ┌──┬──┬──┬──┬──┬──┬──┬──┬──┐
  0 │ 0│ 0│ 0│ 0│ 0│ 0│ 0│ 0│ 0│
    ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
i 1 │ 0│ 0│ 3│ 3│ 3│ 3│ 3│ 3│ 3│ ← Item 0 (w=2,v=3)
  t ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
  e 2 │ 0│ 0│ 3│ 4│ 4│ 7│ 7│ 7│ 7│ ← Item 1 (w=3,v=4)
  m ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
  s 3 │ 0│ 0│ 3│ 4│ 5│ 7│ 8│ 9│ 9│ ← Item 2 (w=4,v=5)
    ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
  4 │ 0│ 0│ 3│ 4│ 5│ 7│ 8│ 9│10│ ← Item 3 (w=5,v=6)
    └──┴──┴──┴──┴──┴──┴──┴──┴──┘
                              ↑
                        Max Value = 10

Backtracking to find selected items:

Knapsack [Capacity: 8, Total Value: 10]
┌────────────────────────┐
│  [▓▓▓] Item 1 (w=3)   │ ← Selected ✓
│  [▓▓▓▓▓] Item 3 (w=5) │ ← Selected ✓
│                        │
│  Total: 3+5 = 8 ≤ 8   │
│  Value: 4+6 = 10 💰   │
└────────────────────────┘

Items NOT selected: Item 0, Item 2
Reason: Adding them would exceed capacity
```

### Node.js Implementation
```javascript
/**
 * 0/1 Knapsack - Dynamic Programming Solution
 */
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    // Create DP table
    const dp = Array(n + 1).fill(null)
        .map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // Don't include current item
            dp[i][w] = dp[i-1][w];
            
            // Include current item if it fits
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                );
            }
        }
    }
    
    return dp[n][capacity];
}


/**
 * Space-optimized version using 1D array
 */
function knapsack01Optimized(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        // Traverse from right to left
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}


/**
 * Returns both max value and selected items
 */
function knapsack01WithItems(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(null)
        .map(() => Array(capacity + 1).fill(0));
    
    // Build DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i-1][w];
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                );
            }
        }
    }
    
    // Backtrack to find selected items
    const selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i-1][w]) {
            selectedItems.push(i-1);
            w -= weights[i-1];
        }
    }
    
    return {
        maxValue: dp[n][capacity],
        items: selectedItems.reverse()
    };
}


// Example usage
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 8;

console.log("0/1 Knapsack Max Value:", knapsack01(weights, values, capacity));
console.log("Optimized Max Value:", knapsack01Optimized(weights, values, capacity));

const result = knapsack01WithItems(weights, values, capacity);
console.log("Selected items (indices):", result.items, "Value:", result.maxValue);
```

---

## 2. Unbounded Knapsack Problem

### Description
Similar to 0/1 Knapsack, but **each item can be taken unlimited times**. You can pick the same item multiple times if it fits.

### Real-World Applications
- **Coin Change Problem**: Making change with unlimited coins of each denomination
- **Rod Cutting**: Cutting a rod into pieces for maximum profit
- **Resource Production**: Manufacturing products with unlimited raw materials
- **Inventory Stocking**: Filling warehouse with products (can order multiple units)

### Time Complexity
- **DP Solution**: O(N × W)
- **Space Complexity**: O(W)

### Python Implementation
```python
def knapsack_unbounded(weights, values, capacity):
    """
    Unbounded Knapsack - Items can be taken unlimited times
    """
    # dp[w] = max value achievable with capacity w
    dp = [0] * (capacity + 1)
    
    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]


def knapsack_unbounded_with_count(weights, values, capacity):
    """
    Returns max value and count of each item used
    """
    dp = [0] * (capacity + 1)
    item_count = [[0] * len(weights) for _ in range(capacity + 1)]
    
    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                new_value = dp[w - weights[i]] + values[i]
                if new_value > dp[w]:
                    dp[w] = new_value
                    # Copy previous counts
                    item_count[w] = item_count[w - weights[i]][:]
                    item_count[w][i] += 1
    
    return dp[capacity], item_count[capacity]


# Example usage
if __name__ == "__main__":
    weights = [2, 3, 4]
    values = [3, 4, 5]
    capacity = 10
    
    max_value = knapsack_unbounded(weights, values, capacity)
    print(f"Unbounded Knapsack Max Value: {max_value}")
    
    max_value, counts = knapsack_unbounded_with_count(weights, values, capacity)
    print(f"Item counts: {counts}, Total Value: {max_value}")
```

**Visual Example:**

```
Items: weights = [2, 3, 4], values = [3, 4, 5], capacity = 10

┌─────────────────────────────────────────────────────────┐
│ Item 0: weight=2, value=3  [▓▓] → $3    (∞ available) │
│ Item 1: weight=3, value=4  [▓▓▓] → $4   (∞ available) │
│ Item 2: weight=4, value=5  [▓▓▓▓] → $5  (∞ available) │
└─────────────────────────────────────────────────────────┘

DP Array (capacity 0 to 10):

Capacity:  0   1   2   3   4   5   6   7   8   9  10
         ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  Value: │ 0 │ 0 │ 3 │ 4 │ 6 │ 8 │ 9 │11 │12 │14 │15 │
         └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
                                                      ↑
                                              Max Value = 15

Step-by-step filling:
  w=2: Take item 0 → value = 3
  w=3: Take item 1 → value = 4 (better than 3)
  w=4: Take 2×item 0 or 1×item 2 → value = 6 (2×3 = 6 > 5)
  w=5: Take item 0+1 → value = 8 (3+4 = 7, but 3+3+? = 8)
  ...
  w=10: Take 5×item 0 → value = 15 (5×3 = 15)

Optimal Solution for capacity=10:

Knapsack [Capacity: 10, Total Value: 15]
┌────────────────────────────────┐
│  [▓▓] Item 0 × 5 (w=2, v=3)   │ ← Used 5 times! ✓
│  [  ] Item 1 × 0 (w=3, v=4)   │
│  [  ] Item 2 × 0 (w=4, v=5)   │
│                                │
│  Total Weight: 5×2 = 10       │
│  Total Value:  5×3 = 15 💰    │
└────────────────────────────────┘

Visualization:
  [▓▓][▓▓][▓▓][▓▓][▓▓] = 10 units, $15

Key Difference from 0/1: Same item can be used multiple times!
```

### Node.js Implementation
```javascript
/**
 * Unbounded Knapsack - Items can be taken unlimited times
 */
function knapsackUnbounded(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}


/**
 * Returns max value and count of each item used
 */
function knapsackUnboundedWithCount(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    const itemCount = Array(capacity + 1).fill(null)
        .map(() => Array(weights.length).fill(0));
    
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                const newValue = dp[w - weights[i]] + values[i];
                if (newValue > dp[w]) {
                    dp[w] = newValue;
                    // Copy previous counts
                    itemCount[w] = [...itemCount[w - weights[i]]];
                    itemCount[w][i]++;
                }
            }
        }
    }
    
    return {
        maxValue: dp[capacity],
        counts: itemCount[capacity]
    };
}


// Example usage
const weights = [2, 3, 4];
const values = [3, 4, 5];
const capacity = 10;

console.log("Unbounded Knapsack Max Value:", 
    knapsackUnbounded(weights, values, capacity));

const result = knapsackUnboundedWithCount(weights, values, capacity);
console.log("Item counts:", result.counts, "Total Value:", result.maxValue);
```

---

## 3. Fractional Knapsack Problem

### Description
Items can be **broken into smaller pieces**. You can take a fraction of an item to maximize value.

### Real-World Applications
- **Continuous Resource Allocation**: Allocating budget across projects (can partially fund)
- **Chemical Mixing**: Mixing chemicals in optimal proportions
- **Food/Material Distribution**: Distributing divisible resources
- **Portfolio Optimization**: Investing fractions of capital in different assets

### Time Complexity
- **Greedy Solution**: O(N log N) due to sorting
- **Space Complexity**: O(1)

### Python Implementation
```python
def knapsack_fractional(weights, values, capacity):
    """
    Fractional Knapsack - Greedy approach
    Items can be divided into fractions
    """
    # Calculate value-to-weight ratio for each item
    items = []
    for i in range(len(weights)):
        items.append({
            'index': i,
            'weight': weights[i],
            'value': values[i],
            'ratio': values[i] / weights[i]
        })
    
    # Sort by ratio in descending order (greedy approach)
    items.sort(key=lambda x: x['ratio'], reverse=True)
    
    total_value = 0.0
    fractions = [0.0] * len(weights)
    
    for item in items:
        if capacity >= item['weight']:
            # Take the whole item
            capacity -= item['weight']
            total_value += item['value']
            fractions[item['index']] = 1.0
        else:
            # Take fraction of the item
            fraction = capacity / item['weight']
            total_value += item['value'] * fraction
            fractions[item['index']] = fraction
            break  # Knapsack is full
    
    return total_value, fractions


# Example usage
if __name__ == "__main__":
    weights = [10, 20, 30]
    values = [60, 100, 120]
    capacity = 50
    
    max_value, fractions = knapsack_fractional(weights, values, capacity)
    print(f"Fractional Knapsack Max Value: {max_value}")
    print(f"Item fractions: {fractions}")
```

**Visual Example:**

```
Items: weights = [10, 20, 30], values = [60, 100, 120], capacity = 50

Step 1: Calculate value/weight ratio
┌──────────────────────────────────────────────────────────┐
│ Item 0: w=10, v=60,  ratio=6.0   [Highest Priority] ⭐  │
│ Item 1: w=20, v=100, ratio=5.0   [Medium Priority]      │
│ Item 2: w=30, v=120, ratio=4.0   [Lowest Priority]      │
└──────────────────────────────────────────────────────────┘

Step 2: Greedy Selection (sorted by ratio)

  Ratio
   6.0 │ ████████████ Item 0 (Take 100%)
       │
   5.0 │ ██████████ Item 1 (Take 100%)
       │
   4.0 │ ████████ Item 2 (Take 66.67%)
       │
   0.0 └────────────────────────────────────────

Step 3: Fill Knapsack

Capacity Used:
  0        10        30              50
  ├─────────┼─────────┼───────────────┤
  │ Item 0  │ Item 1  │  Item 2 (⅔)  │
  │  100%   │  100%   │   66.67%      │
  │  w=10   │  w=20   │   w=20        │
  │  v=60   │  v=100  │   v=80        │
  └─────────┴─────────┴───────────────┘

Knapsack [Capacity: 50, Total Value: 240]
┌──────────────────────────────────────┐
│  [▓▓▓▓▓▓▓▓▓▓] Item 0: 100% = 60     │ ← Fully taken ✓
│  [▓▓▓▓▓▓▓▓▓▓] Item 1: 100% = 100    │ ← Fully taken ✓
│  [▓▓▓▓▓▓▓░░░] Item 2: 66.7% = 80    │ ← Partially taken ✓
│                                      │
│  Total Weight: 10+20+20 = 50        │
│  Total Value:  60+100+80 = 240 💰   │
└──────────────────────────────────────┘

Fractional breakdown:
  Item 0: 10/10 = 1.0   (100% taken)
  Item 1: 20/20 = 1.0   (100% taken)
  Item 2: 20/30 = 0.667 (66.7% taken, 33.3% left)

Key: Can take fractions! This gives optimal value for divisible items.
```

### Node.js Implementation
```javascript
/**
 * Fractional Knapsack - Greedy approach
 */
function knapsackFractional(weights, values, capacity) {
    // Calculate value-to-weight ratio for each item
    const items = weights.map((weight, i) => ({
        index: i,
        weight: weight,
        value: values[i],
        ratio: values[i] / weight
    }));
    
    // Sort by ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0.0;
    const fractions = Array(weights.length).fill(0.0);
    
    for (const item of items) {
        if (capacity >= item.weight) {
            // Take the whole item
            capacity -= item.weight;
            totalValue += item.value;
            fractions[item.index] = 1.0;
        } else {
            // Take fraction of the item
            const fraction = capacity / item.weight;
            totalValue += item.value * fraction;
            fractions[item.index] = fraction;
            break; // Knapsack is full
        }
    }
    
    return {
        maxValue: totalValue,
        fractions: fractions
    };
}


// Example usage
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;

const result = knapsackFractional(weights, values, capacity);
console.log("Fractional Knapsack Max Value:", result.maxValue);
console.log("Item fractions:", result.fractions);
```

---

## 4. Bounded Knapsack Problem

### Description
Each item has a **limited quantity**. Item i can be taken at most `count[i]` times.

### Real-World Applications
- **Limited Inventory**: Store has limited stock of each product
- **Manufacturing**: Limited raw materials for each component
- **Event Planning**: Limited seats/resources of each type
- **Supply Chain**: Limited supplier capacity for each item

### Time Complexity
- **DP Solution**: O(N × W × max(count))
- **Optimized**: O(N × W) using binary representation

### Python Implementation
```python
def knapsack_bounded(weights, values, counts, capacity):
    """
    Bounded Knapsack - Each item has limited quantity
    """
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # For each item type
        for _ in range(counts[i]):
            # Process like 0/1 knapsack (right to left)
            for w in range(capacity, weights[i] - 1, -1):
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]


def knapsack_bounded_optimized(weights, values, counts, capacity):
    """
    Optimized using binary representation trick
    Converts bounded to 0/1 by representing counts in binary
    """
    # Expand items using binary representation
    new_weights = []
    new_values = []
    
    for i in range(len(weights)):
        count = counts[i]
        k = 1
        while k <= count:
            new_weights.append(weights[i] * k)
            new_values.append(values[i] * k)
            count -= k
            k *= 2
        
        if count > 0:
            new_weights.append(weights[i] * count)
            new_values.append(values[i] * count)
    
    # Apply 0/1 knapsack on expanded items
    dp = [0] * (capacity + 1)
    for i in range(len(new_weights)):
        for w in range(capacity, new_weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - new_weights[i]] + new_values[i])
    
    return dp[capacity]


# Example usage
if __name__ == "__main__":
    weights = [2, 3, 4]
    values = [3, 4, 5]
    counts = [2, 3, 2]  # Can take item 0 twice, item 1 thrice, etc.
    capacity = 10
    
    max_value = knapsack_bounded(weights, values, counts, capacity)
    print(f"Bounded Knapsack Max Value: {max_value}")
    
    max_value_opt = knapsack_bounded_optimized(weights, values, counts, capacity)
    print(f"Optimized Max Value: {max_value_opt}")
```

**Visual Example:**

```
Items: weights = [2, 3, 4], values = [3, 4, 5], counts = [2, 3, 2]
        capacity = 10

Inventory Available:
┌─────────────────────────────────────────────────────────┐
│ Item 0: w=2, v=3  [▓▓][▓▓]           (2 available)    │
│ Item 1: w=3, v=4  [▓▓▓][▓▓▓][▓▓▓]    (3 available)    │
│ Item 2: w=4, v=5  [▓▓▓▓][▓▓▓▓]       (2 available)    │
└─────────────────────────────────────────────────────────┘

Binary Representation Trick:
Item 0 (count=2): Split into [1×item0, 1×item0]
  → weights: [2, 2], values: [3, 3]

Item 1 (count=3): Split into [1×item1, 2×item1]
  → weights: [3, 6], values: [4, 8]

Item 2 (count=2): Split into [1×item2, 1×item2]
  → weights: [4, 4], values: [5, 5]

Optimal Solution:

Knapsack [Capacity: 10, Total Value: 12]
┌────────────────────────────────────┐
│  [▓▓] Item 0 × 2 (w=2, v=3)       │ ← Used 2/2 ✓
│  [▓▓▓] Item 1 × 1 (w=3, v=4)      │ ← Used 1/3 ✓
│  [  ] Item 2 × 0 (w=4, v=5)       │ ← Used 0/2
│                                    │
│  Total Weight: 2+2+3 = 7 ≤ 10     │
│  Total Value:  3+3+4 = 10 💰      │
└────────────────────────────────────┘

Alternative (if item 2 chosen):
┌────────────────────────────────────┐
│  [  ] Item 0 × 0                  │
│  [▓▓▓] Item 1 × 2 (w=3, v=4)      │ ← Used 2/3 ✓
│  [▓▓▓▓] Item 2 × 1 (w=4, v=5)     │ ← Used 1/2 ✓
│                                    │
│  Total Weight: 6+4 = 10           │
│  Total Value:  8+5 = 13 💰        │ ← Better!
└────────────────────────────────────┘

Visualization:
  [▓▓▓][▓▓▓][▓▓▓▓] = 10 units, $13

Key: Limited quantity per item, but can use up to count[i] times!
```

### Node.js Implementation
```javascript
/**
 * Bounded Knapsack - Each item has limited quantity
 */
function knapsackBounded(weights, values, counts, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        // For each item type
        for (let j = 0; j < counts[i]; j++) {
            // Process like 0/1 knapsack (right to left)
            for (let w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}


/**
 * Optimized using binary representation trick
 */
function knapsackBoundedOptimized(weights, values, counts, capacity) {
    // Expand items using binary representation
    const newWeights = [];
    const newValues = [];
    
    for (let i = 0; i < weights.length; i++) {
        let count = counts[i];
        let k = 1;
        
        while (k <= count) {
            newWeights.push(weights[i] * k);
            newValues.push(values[i] * k);
            count -= k;
            k *= 2;
        }
        
        if (count > 0) {
            newWeights.push(weights[i] * count);
            newValues.push(values[i] * count);
        }
    }
    
    // Apply 0/1 knapsack on expanded items
    const dp = Array(capacity + 1).fill(0);
    for (let i = 0; i < newWeights.length; i++) {
        for (let w = capacity; w >= newWeights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - newWeights[i]] + newValues[i]);
        }
    }
    
    return dp[capacity];
}


// Example usage
const weights = [2, 3, 4];
const values = [3, 4, 5];
const counts = [2, 3, 2];
const capacity = 10;

console.log("Bounded Knapsack Max Value:", 
    knapsackBounded(weights, values, counts, capacity));
console.log("Optimized Max Value:", 
    knapsackBoundedOptimized(weights, values, counts, capacity));
```

---

## 5. Multiple Knapsack Problem

### Description
**Multiple knapsacks** with different capacities. Distribute items across multiple knapsacks to maximize total value.

### Real-World Applications
- **Logistics**: Loading multiple trucks/containers
- **Cloud Computing**: Distributing tasks across multiple servers
- **Team Assignment**: Assigning tasks to multiple teams with different capacities
- **Multi-warehouse Distribution**: Allocating products to warehouses

### Time Complexity
- **NP-Hard**: More complex than single knapsack
- **Heuristic/Approximation**: Often used in practice

### Python Implementation
```python
def knapsack_multiple(weights, values, capacities):
    """
    Multiple Knapsack Problem
    Simple approach: Fill knapsacks one by one using best-fit
    """
    n = len(weights)
    m = len(capacities)
    
    # Track which items are assigned to which knapsack
    assignments = [-1] * n  # -1 means not assigned
    knapsack_values = [0] * m
    
    # Create items with indices
    items = [(values[i], weights[i], i) for i in range(n)]
    # Sort by value-to-weight ratio (greedy)
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    
    for value, weight, idx in items:
        # Find best knapsack for this item
        best_knapsack = -1
        for k in range(m):
            if capacities[k] >= weight:
                if best_knapsack == -1 or capacities[k] < capacities[best_knapsack]:
                    best_knapsack = k
        
        if best_knapsack != -1:
            # Assign item to knapsack
            assignments[idx] = best_knapsack
            knapsack_values[best_knapsack] += value
            capacities[best_knapsack] -= weight
    
    total_value = sum(knapsack_values)
    return total_value, assignments


# Example usage
if __name__ == "__main__":
    weights = [4, 5, 3, 7, 2]
    values = [10, 12, 8, 15, 5]
    capacities = [10, 8, 6]  # Three knapsacks
    
    max_value, assignments = knapsack_multiple(weights, values, capacities[:])
    print(f"Multiple Knapsack Total Value: {max_value}")
    print(f"Item assignments to knapsacks: {assignments}")
```

**Visual Example:**

```
Items: weights = [4, 5, 3, 7, 2], values = [10, 12, 8, 15, 5]
Knapsacks: capacities = [10, 8, 6]

Step 1: Calculate value/weight ratios (for greedy assignment)
┌─────────────────────────────────────────────────────────┐
│ Item 0: w=4, v=10, ratio=2.50  [Priority: 3]          │
│ Item 1: w=5, v=12, ratio=2.40  [Priority: 4]          │
│ Item 2: w=3, v=8,  ratio=2.67  [Priority: 2] ⭐       │
│ Item 3: w=7, v=15, ratio=2.14  [Priority: 5]          │
│ Item 4: w=2, v=5,  ratio=2.50  [Priority: 3]          │
└─────────────────────────────────────────────────────────┘

Step 2: Sort by ratio: Item 2 → Item 0 → Item 4 → Item 1 → Item 3

Step 3: Greedy Assignment (best-fit strategy)

Knapsack 0 [Capacity: 10]
┌────────────────────────────────────┐
│  [▓▓▓] Item 2 (w=3, v=8)          │ ← Assigned ✓
│  [▓▓▓▓▓▓▓] Item 3 (w=7, v=15)     │ ← Assigned ✓
│                                    │
│  Used: 3+7 = 10/10 (FULL)         │
│  Value: 8+15 = 23 💰              │
└────────────────────────────────────┘

Knapsack 1 [Capacity: 8]
┌────────────────────────────────────┐
│  [▓▓▓▓] Item 0 (w=4, v=10)        │ ← Assigned ✓
│  [▓▓] Item 4 (w=2, v=5)           │ ← Assigned ✓
│                                    │
│  Used: 4+2 = 6/8                  │
│  Value: 10+5 = 15 💰              │
└────────────────────────────────────┘

Knapsack 2 [Capacity: 6]
┌────────────────────────────────────┐
│  [▓▓▓▓▓] Item 1 (w=5, v=12)       │ ← Assigned ✓
│                                    │
│  Used: 5/6                        │
│  Value: 12 💰                     │
└────────────────────────────────────┘

Distribution Summary:
  Knapsack 0: Items [2, 3] → Value = 23
  Knapsack 1: Items [0, 4] → Value = 15
  Knapsack 2: Items [1]    → Value = 12
  ─────────────────────────────────────
  Total Value: 23 + 15 + 12 = 50 💰

Assignment Array: [1, 2, 0, 0, 1]
                   │  │  │  │  └─ Item 4 → Knapsack 1
                   │  │  │  └──── Item 3 → Knapsack 0
                   │  │  └─────── Item 2 → Knapsack 0
                   │  └────────── Item 1 → Knapsack 2
                   └───────────── Item 0 → Knapsack 1

Key: Distribute items across multiple containers to maximize total value!
```

### Node.js Implementation
```javascript
/**
 * Multiple Knapsack Problem
 * Greedy approach: Fill knapsacks one by one
 */
function knapsackMultiple(weights, values, capacities) {
    const n = weights.length;
    const m = capacities.length;
    
    // Track which items are assigned to which knapsack
    const assignments = Array(n).fill(-1);
    const knapsackValues = Array(m).fill(0);
    const caps = [...capacities]; // Copy to avoid modifying original
    
    // Create items with indices
    const items = weights.map((weight, i) => ({
        value: values[i],
        weight: weight,
        index: i,
        ratio: values[i] / weight
    }));
    
    // Sort by value-to-weight ratio (greedy)
    items.sort((a, b) => b.ratio - a.ratio);
    
    for (const item of items) {
        // Find best knapsack for this item
        let bestKnapsack = -1;
        for (let k = 0; k < m; k++) {
            if (caps[k] >= item.weight) {
                if (bestKnapsack === -1 || caps[k] < caps[bestKnapsack]) {
                    bestKnapsack = k;
                }
            }
        }
        
        if (bestKnapsack !== -1) {
            // Assign item to knapsack
            assignments[item.index] = bestKnapsack;
            knapsackValues[bestKnapsack] += item.value;
            caps[bestKnapsack] -= item.weight;
        }
    }
    
    const totalValue = knapsackValues.reduce((a, b) => a + b, 0);
    return {
        totalValue: totalValue,
        assignments: assignments
    };
}


// Example usage
const weights = [4, 5, 3, 7, 2];
const values = [10, 12, 8, 15, 5];
const capacities = [10, 8, 6];

const result = knapsackMultiple(weights, values, capacities);
console.log("Multiple Knapsack Total Value:", result.totalValue);
console.log("Item assignments to knapsacks:", result.assignments);
```

---

## Comparison Table

| Variant | Items Can Be | Repetition | Approach | Time Complexity | Use Case |
|---------|-------------|------------|----------|----------------|----------|
| **0/1 Knapsack** | Taken or not | Once per item | Dynamic Programming | O(N×W) | Discrete, unique items |
| **Unbounded** | Taken any times | Unlimited | Dynamic Programming | O(N×W) | Infinite supply items |
| **Fractional** | Divided/Split | Partial amounts | Greedy | O(N log N) | Divisible resources |
| **Bounded** | Limited count | count[i] times | DP or Binary Trick | O(N×W×C) or O(N×W) | Limited inventory |
| **Multiple** | Across containers | Once total | Heuristic/DP | NP-Hard | Multiple containers |

**Visual Comparison:**

```
Item Usage Across Variants:

0/1 Knapsack:
  Items: [A] [B] [C] [D]
  Usage: [✓] [ ] [✓] [ ]  → Take or Leave (Binary)

Unbounded Knapsack:
  Items: [A] [B] [C]
  Usage: [A][A][A][B][C][C]  → Unlimited repetition

Fractional Knapsack:
  Items: [A] [B] [C]
  Usage: [A][B][C₁][C₂]  → Can split items
         ↑  ↑  ↑   ↑
       100% 100% 60% (partial)

Bounded Knapsack:
  Items: [A×2] [B×3] [C×1]
  Usage: [A][A][B][B]  → Limited count
         ✓  ✓  ✓  ✓   (Used: A=2/2, B=2/3, C=0/1)

Multiple Knapsack:
  Items: [A] [B] [C] [D]
  Bag 1: [A][C]      → Distribute across
  Bag 2: [B]         → multiple containers
  Bag 3: [D]

───────────────────────────────────────────────────────────

Complexity Visualization:

Time Complexity:
  Fractional    │████ O(N log N)
  0/1           │████████████████ O(N×W)
  Unbounded     │████████████████ O(N×W)
  Bounded       │████████████████████████ O(N×W×C)
  Multiple      │██████████████████████████████ NP-Hard
                └────────────────────────────────────→
                 Easier                         Harder

Space Complexity:
  All variants: O(W) with optimization
  (except Multiple which depends on algorithm)

───────────────────────────────────────────────────────────

Decision Tree for Choosing Variant:

                  START
                    │
        ┌───────────┴───────────┐
        │                       │
   One Container?        Multiple Containers?
        │                       │
        ├───────────┐      MULTIPLE KNAPSACK
        │           │
   Items           Items
  Divisible?    Indivisible?
        │           │
        │           ├─────────────────┐
   FRACTIONAL       │                 │
                Can Repeat?      Each Item Once?
                    │                 │
              ┌─────┴─────┐           │
              │           │           │
         Unlimited    Limited      0/1 KNAPSACK
         Repeats?    Quantity?
              │           │
         UNBOUNDED   BOUNDED

───────────────────────────────────────────────────────────

Iteration Direction (Critical!):

Capacity Loop Direction:
  0/1 Knapsack:     ←←←←←← (Right to Left)
    for w in range(W, weight[i]-1, -1):
        # Avoid using same item twice

  Unbounded:        →→→→→→ (Left to Right)
    for w in range(weight[i], W+1):
        # Allow reusing same item

  Why Different?
    0/1: Process in reverse to prevent item reuse
    Unbounded: Forward iteration allows item reuse
```

---

## When to Use Each Variant

### Use 0/1 Knapsack when:
- Items are **discrete and indivisible**
- Each item can only be selected **once**
- Example: Selecting unique investment opportunities, loading cargo

### Use Unbounded Knapsack when:
- Items can be selected **multiple times**
- **Unlimited supply** of each item type
- Example: Coin change, cutting rod into pieces, unlimited inventory

### Use Fractional Knapsack when:
- Items can be **divided or broken**
- Can take **partial amounts**
- Example: Continuous resource allocation, chemical mixing, liquids/powders

### Use Bounded Knapsack when:
- Items have **limited quantity** available
- Can take item i **at most count[i] times**
- Example: Limited stock inventory, constrained manufacturing

### Use Multiple Knapsack when:
- **Multiple containers/knapsacks** available
- Need to **distribute items** across them
- Example: Loading multiple trucks, multi-server task allocation

---

## Key Differences Summary

### 0/1 vs Unbounded
- **0/1**: Each item once → Iterate capacity **right-to-left**
- **Unbounded**: Items unlimited → Iterate capacity **left-to-right**

### 0/1 vs Fractional
- **0/1**: Dynamic Programming, exact solution
- **Fractional**: Greedy algorithm, faster but needs divisible items

### Bounded vs Unbounded
- **Bounded**: Limited copies → Add count constraint
- **Unbounded**: Infinite copies → No count limit

### Single vs Multiple
- **Single**: One knapsack → Maximize single container
- **Multiple**: Many knapsacks → Distribute across containers

---

## Practice Problems

### 0/1 Knapsack
- Partition Equal Subset Sum
- Target Sum
- Last Stone Weight II

### Unbounded Knapsack
- Coin Change
- Coin Change II
- Rod Cutting
- Perfect Squares

### Bounded Knapsack
- Ones and Zeroes (2D bounded)
- Shopping Offers

---

## Notes
- All DP solutions can be **space-optimized** to O(W)
- Fractional gives **optimal solution** using Greedy (unlike 0/1)
- Multiple Knapsack is **NP-Hard**; heuristics often used
- Understanding these variants helps solve **many DP problems**
