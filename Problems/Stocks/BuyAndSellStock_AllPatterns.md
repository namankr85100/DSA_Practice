# Buy and Sell Stock - Complete Guide

A comprehensive guide to all "Best Time to Buy and Sell Stock" problems with detailed solution approaches.

---

## 📚 Problem Index

| # | Problem | Difficulty | Constraints | Key Pattern |
|---|---------|-----------|-------------|-------------|
| 121 | Best Time to Buy and Sell Stock | Easy | 1 transaction | Kadane's Algorithm |
| 122 | Best Time to Buy and Sell Stock II | Medium | Unlimited transactions | Greedy |
| 123 | Best Time to Buy and Sell Stock III | Hard | At most 2 transactions | State Machine DP |
| 188 | Best Time to Buy and Sell Stock IV | Hard | At most k transactions | DP with optimization |
| 309 | Best Time to Buy and Sell Stock with Cooldown | Medium | Cooldown period | State Machine DP |
| 714 | Best Time to Buy and Sell Stock with Transaction Fee | Medium | Transaction fee | DP/Greedy |

---

## Problem 1: Buy and Sell Stock (LeetCode 121)

### 📖 Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit. If you cannot achieve any profit, return 0.

**Constraints:**
- Only **1 transaction** allowed (1 buy + 1 sell)

### Example

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
```

### 💡 Approach 1: Brute Force (TLE)

**Idea:** Try all possible buy-sell combinations.

```python
def maxProfit(prices):
    """
    Time: O(n²) - TLE
    Space: O(1)
    """
    max_profit = 0
    n = len(prices)
    
    for i in range(n):
        for j in range(i + 1, n):
            profit = prices[j] - prices[i]
            max_profit = max(max_profit, profit)
    
    return max_profit
```

❌ **Time Limit Exceeded** for large inputs

---

### ⚡ Approach 2: One Pass (Kadane's Algorithm) - OPTIMAL

**Key Insight:** Track minimum price seen so far, calculate profit at each step.

**Think of it as:** "What if I sold today? What would my profit be?"

```python
def maxProfit(prices):
    """
    Time: O(n) - Single pass ✅
    Space: O(1) - Constant space ✅
    """
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        # Update minimum price seen so far
        min_price = min(min_price, price)
        
        # Calculate profit if we sell today
        profit = price - min_price
        
        # Update max profit
        max_profit = max(max_profit, profit)
    
    return max_profit
```

**JavaScript:**

```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}
```

**Dry Run:**

```
prices = [7, 1, 5, 3, 6, 4]

Day 0: price=7, minPrice=7, profit=0, maxProfit=0
Day 1: price=1, minPrice=1, profit=0, maxProfit=0
Day 2: price=5, minPrice=1, profit=4, maxProfit=4
Day 3: price=3, minPrice=1, profit=2, maxProfit=4
Day 4: price=6, minPrice=1, profit=5, maxProfit=5 ✅
Day 5: price=4, minPrice=1, profit=3, maxProfit=5

Answer: 5
```

---

## Problem 2: Buy and Sell Stock II (LeetCode 122)

### 📖 Problem Statement

You are given an integer array `prices`. Find the maximum profit you can achieve. You may complete as many transactions as you like.

**Constraints:**
- **Unlimited transactions** allowed
- You must sell before buying again

### Example

```
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (1) sell on day 3 (5), profit = 4
             Buy on day 4 (3) sell on day 5 (6), profit = 3
             Total = 7
```

### ⚡ Approach: Greedy (Peak-Valley)

**Key Insight:** Add all positive differences (upward slopes).

Every profitable day contributes to total profit!

```python
def maxProfit(prices):
    """
    Time: O(n)
    Space: O(1)
    """
    max_profit = 0
    
    for i in range(1, len(prices)):
        # If price increased, we can profit
        if prices[i] > prices[i - 1]:
            max_profit += prices[i] - prices[i - 1]
    
    return max_profit
```

**JavaScript:**

```javascript
function maxProfit(prices) {
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }
    
    return maxProfit;
}
```

**Visualization:**

```
prices = [7, 1, 5, 3, 6, 4]

         ┌─ 6
      5 ─┤
      │  │  4
      │  3─┘
7 ─┐  │
   │  │
   └─ 1

Profitable moves: (5-1) + (6-3) = 4 + 3 = 7
```

---

## Problem 3: Buy and Sell Stock III (LeetCode 123)

### 📖 Problem Statement

You may complete **at most two transactions**.

**Constraints:**
- At most **2 transactions** (2 buy-sell pairs)
- You must sell before buying again

### Example

```
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (0) sell on day 6 (3), profit = 3
             Buy on day 7 (1) sell on day 8 (4), profit = 3
             Total = 6
```

### ⚡ Approach: State Machine DP

**States:**
- `buy1`: Money after first buy
- `sell1`: Money after first sell
- `buy2`: Money after second buy
- `sell2`: Money after second sell

```python
def maxProfit(prices):
    """
    Time: O(n)
    Space: O(1)
    """
    # Initialize states (negative infinity means impossible initially)
    buy1 = buy2 = float('-inf')
    sell1 = sell2 = 0
    
    for price in prices:
        # Update in reverse to avoid using updated values
        buy1 = max(buy1, -price)           # Buy first stock
        sell1 = max(sell1, buy1 + price)   # Sell first stock
        buy2 = max(buy2, sell1 - price)    # Buy second stock
        sell2 = max(sell2, buy2 + price)   # Sell second stock
    
    return sell2
```

**JavaScript:**

```javascript
function maxProfit(prices) {
    let buy1 = -Infinity, sell1 = 0;
    let buy2 = -Infinity, sell2 = 0;
    
    for (const price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }
    
    return sell2;
}
```

**State Transitions:**

```
         buy1        sell1        buy2        sell2
START ─────→ HOLD1 ────→ SOLD1 ────→ HOLD2 ────→ SOLD2 (FINAL)
         -price    +price      -price    +price
```

---

## Problem 4: Buy and Sell Stock IV (LeetCode 188)

### 📖 Problem Statement

You may complete **at most k transactions**.

**Constraints:**
- At most **k transactions**
- You must sell before buying again

### ⚡ Approach: DP with Optimization

**Key Insight:** Generalize Problem 3 to k transactions.

```python
def maxProfit(k, prices):
    """
    Time: O(n * k)
    Space: O(k)
    """
    if not prices or k == 0:
        return 0
    
    n = len(prices)
    
    # If k >= n/2, it's unlimited transactions (Problem 122)
    if k >= n // 2:
        return sum(max(0, prices[i] - prices[i-1]) for i in range(1, n))
    
    # DP arrays for k transactions
    buy = [float('-inf')] * (k + 1)
    sell = [0] * (k + 1)
    
    for price in prices:
        # Iterate in reverse to avoid using updated values
        for i in range(k, 0, -1):
            sell[i] = max(sell[i], buy[i] + price)
            buy[i] = max(buy[i], sell[i-1] - price)
    
    return sell[k]
```

**JavaScript:**

```javascript
function maxProfit(k, prices) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;
    
    // Optimization: k >= n/2 means unlimited transactions
    if (k >= Math.floor(n / 2)) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            profit += Math.max(0, prices[i] - prices[i-1]);
        }
        return profit;
    }
    
    const buy = new Array(k + 1).fill(-Infinity);
    const sell = new Array(k + 1).fill(0);
    
    for (const price of prices) {
        for (let i = k; i > 0; i--) {
            sell[i] = Math.max(sell[i], buy[i] + price);
            buy[i] = Math.max(buy[i], sell[i-1] - price);
        }
    }
    
    return sell[k];
}
```

---

## Problem 5: Buy and Sell Stock with Cooldown (LeetCode 309)

### 📖 Problem Statement

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

**Constraints:**
- Unlimited transactions
- **1-day cooldown** after selling

### Example

```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: Buy (1) → Sell (2) → Cooldown → Buy (0) → Sell (2)
             Profit: (2-1) + (2-0) = 3
```

### ⚡ Approach: State Machine DP

**States:**
- `hold`: Currently holding stock
- `sold`: Just sold stock (cooldown next day)
- `rest`: Resting (can buy tomorrow)

```python
def maxProfit(prices):
    """
    Time: O(n)
    Space: O(1)
    """
    hold = float('-inf')  # Holding stock
    sold = 0              # Just sold
    rest = 0              # Resting
    
    for price in prices:
        prev_sold = sold
        
        # Sell stock today or keep holding
        sold = hold + price
        
        # Buy stock today (from rest) or keep holding
        hold = max(hold, rest - price)
        
        # Rest (from previous sold or keep resting)
        rest = max(rest, prev_sold)
    
    return max(sold, rest)
```

**JavaScript:**

```javascript
function maxProfit(prices) {
    let hold = -Infinity;
    let sold = 0;
    let rest = 0;
    
    for (const price of prices) {
        const prevSold = sold;
        
        sold = hold + price;
        hold = Math.max(hold, rest - price);
        rest = Math.max(rest, prevSold);
    }
    
    return Math.max(sold, rest);
}
```

**State Diagram:**

```
        buy
REST ────────→ HOLD
 ↑              │
 │ cooldown    │ sell
 │              ↓
SOLD ←──────── SOLD
```

---

## Problem 6: Buy and Sell Stock with Transaction Fee (LeetCode 714)

### 📖 Problem Statement

You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

**Constraints:**
- Unlimited transactions
- **Fee** charged per transaction

### Example

```
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: Buy (1) → Sell (8) → Buy (4) → Sell (9)
             Profit: (8-1-2) + (9-4-2) = 5 + 3 = 8
```

### ⚡ Approach: State Machine DP

```python
def maxProfit(prices, fee):
    """
    Time: O(n)
    Space: O(1)
    """
    cash = 0      # Not holding stock
    hold = float('-inf')  # Holding stock
    
    for price in prices:
        # Either keep cash or sell stock (pay fee)
        cash = max(cash, hold + price - fee)
        
        # Either keep holding or buy stock
        hold = max(hold, cash - price)
    
    return cash
```

**JavaScript:**

```javascript
function maxProfit(prices, fee) {
    let cash = 0;
    let hold = -Infinity;
    
    for (const price of prices) {
        cash = Math.max(cash, hold + price - fee);
        hold = Math.max(hold, cash - price);
    }
    
    return cash;
}
```

---

## 📊 Comparison Table

| Problem | Transactions | Extra Constraint | Approach | Time | Space |
|---------|--------------|------------------|----------|------|-------|
| 121 | 1 | None | Kadane's | O(n) | O(1) |
| 122 | Unlimited | None | Greedy | O(n) | O(1) |
| 123 | 2 | None | State DP | O(n) | O(1) |
| 188 | k | None | DP | O(nk) | O(k) |
| 309 | Unlimited | Cooldown | State DP | O(n) | O(1) |
| 714 | Unlimited | Fee | State DP | O(n) | O(1) |

---

## 🧠 Pattern Recognition

### When to Use Each Approach

| Pattern | When to Use |
|---------|-------------|
| **Kadane's Algorithm** | Single transaction, find max difference |
| **Greedy** | Unlimited transactions, no constraints |
| **State Machine DP** | Multiple states (holding, sold, cooldown) |
| **DP Array** | k transactions, need to track count |

---

## 💡 Key Insights

1. **Problem 121** is the foundation - master this first
2. **State machines** are powerful for tracking buy/sell states
3. **Optimization matters** - Problem 188 needs k >= n/2 check
4. **Space can be optimized** - Most solutions use O(1) space
5. **Pattern reuse** - Similar DP transitions across all problems

---

## 🎯 Practice Order

**Recommended sequence:**

1. **Start:** 121 (Easy) - Build intuition
2. **Next:** 122 (Medium) - Learn greedy approach
3. **Then:** 309 (Medium) - Introduce state machine
4. **After:** 714 (Medium) - Add complexity (fee)
5. **Hard:** 123 (Hard) - Fixed k=2
6. **Hardest:** 188 (Hard) - General k

---

## 🚀 Advanced Tips

- Always consider **edge cases**: empty array, single element
- **Cooldown problems** need careful state tracking
- **k >= n/2** optimization is crucial for Problem 188
- **State variables** can often be reduced with careful analysis
- Practice **dry runs** to understand state transitions

---

## 📖 Additional Resources

- [LeetCode Stock Problems Collection](https://leetcode.com/tag/stock/)
- [Dynamic Programming Patterns](https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns)
- [State Machine DP Tutorial](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solutions/108870/most-consistent-ways-of-dealing-with-the-series-of-stock-problems/)
