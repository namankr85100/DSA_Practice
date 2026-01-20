# Elimination Game - All Patterns

A comprehensive guide to the Elimination Game problem and all its variations.

---

## 📚 Problem Overview

The Elimination Game is a problem where you start with a list of numbers `1, 2, 3, ..., n` and repeatedly eliminate numbers following specific patterns until only one number remains.

---

## Pattern 1: Standard Elimination Game (LeetCode 390)

### 📖 Problem Statement

You have a list of numbers from `1` to `n`. Starting from the left, remove every other number until only one number remains. After each pass, change direction (left-to-right, then right-to-left, alternating).

**Example:**
```
n = 9

Pass 1 (L→R): [1, 2, 3, 4, 5, 6, 7, 8, 9]
              Remove: 1, 3, 5, 7, 9
              Remaining: [2, 4, 6, 8]

Pass 2 (R→L): [2, 4, 6, 8]
              Remove: 8, 4
              Remaining: [2, 6]

Pass 3 (L→R): [2, 6]
              Remove: 2
              Remaining: [6]

Answer: 6
```

### 💡 Approach 1: Simulation (Brute Force) - TLE

```python
def lastRemaining_brute(n):
    """
    Time: O(n log n)
    Space: O(n)
    """
    arr = list(range(1, n + 1))
    left_to_right = True
    
    while len(arr) > 1:
        if left_to_right:
            # Remove from left: every odd index
            arr = [arr[i] for i in range(1, len(arr), 2)]
        else:
            # Remove from right: every odd index from end
            if len(arr) % 2 == 1:
                arr = [arr[i] for i in range(1, len(arr), 2)]
            else:
                arr = [arr[i] for i in range(0, len(arr), 2)]
        
        left_to_right = not left_to_right
    
    return arr[0]
```

❌ **Memory Limit Exceeded** for large inputs (n = 10^9)

---

### ⚡ Approach 2: Mathematical Pattern (Optimal)

**Key Insight:** Track the head of the list instead of maintaining the entire array.

**When does head change?**
- **Left-to-right pass:** Head always changes
- **Right-to-left pass:** Head changes only if remaining count is odd

**Pattern:**
```
head = starting position of current sequence
step = distance between consecutive numbers
remaining = count of numbers left
```

```python
def lastRemaining(n):
    """
    Time: O(log n) - Number of passes
    Space: O(1) - Constant space
    """
    head = 1           # First element
    step = 1           # Distance between numbers
    remaining = n      # Count of numbers
    left_to_right = True
    
    while remaining > 1:
        # Head changes if:
        # 1. Moving left to right, OR
        # 2. Moving right to left with odd count
        if left_to_right or remaining % 2 == 1:
            head += step
        
        # After each pass:
        remaining //= 2    # Half the numbers are removed
        step *= 2          # Distance doubles
        left_to_right = not left_to_right
    
    return head
```

**JavaScript:**

```javascript
function lastRemaining(n) {
    let head = 1;
    let step = 1;
    let remaining = n;
    let leftToRight = true;
    
    while (remaining > 1) {
        // Update head if moving left-to-right or odd count
        if (leftToRight || remaining % 2 === 1) {
            head += step;
        }
        
        remaining = Math.floor(remaining / 2);
        step *= 2;
        leftToRight = !leftToRight;
    }
    
    return head;
}
```

**Dry Run:**

```
n = 9

Initial:
  Numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  head=1, step=1, remaining=9, L→R

Pass 1 (L→R):
  Remove: 1, 3, 5, 7, 9
  Remaining: [2, 4, 6, 8]
  head = 1 + 1 = 2
  step = 1 * 2 = 2
  remaining = 9 // 2 = 4
  Direction: R→L

Pass 2 (R→L):
  Remove: 8, 4
  Remaining: [2, 6]
  remaining is odd (4), so head changes
  head = 2 + 2 = 4... wait!
  
Actually at this stage:
  [2, 4, 6, 8] (step=2)
  Remove from right: 8, 4
  Head moves: 2 → 6
  head = 2 + 4 = 6
  step = 2 * 2 = 4
  remaining = 4 // 2 = 2
  Direction: L→R

Pass 3 (L→R):
  [2, 6] (step=4)
  head = 6 + 4 = 10? No!
  Wait, remaining = 2
  Remove: 2
  Remaining: [6]
  head changes: 2 → 6
  
Final Answer: 6 ✅
```

**Visual Trace:**

```
n = 9

Step 0: [1, 2, 3, 4, 5, 6, 7, 8, 9]
         ↑ head=1, step=1

Step 1 (L→R): Remove odd positions
         [2, 4, 6, 8]
          ↑ head=2, step=2

Step 2 (R→L): Remove from right (odd count)
         [2, 6]
             ↑ head=6, step=4

Step 3 (L→R): Only one left
         [6]
          ↑ head=6

Answer: 6
```

---

## Pattern 2: Elimination Game II (Reverse Order)

### 📖 Problem Statement

Same as Pattern 1, but return the **last eliminated** number instead of the last remaining.

**Example:**
```
n = 9

Last remaining: 6
Last eliminated: 2 (eliminated in final pass)
```

### ⚡ Approach

Track both the sequence and the last eliminated:

```python
def lastEliminated(n):
    """
    Returns the last number to be eliminated
    """
    if n == 1:
        return 1
    
    # Standard elimination game
    head = 1
    step = 1
    remaining = n
    left_to_right = True
    last_eliminated = None
    
    while remaining > 1:
        # Track what gets eliminated
        if left_to_right:
            # Eliminated: head, head+2*step, head+4*step, ...
            for i in range(remaining // 2):
                last_eliminated = head + i * 2 * step
        else:
            # Eliminated from right
            if remaining % 2 == 1:
                last_eliminated = head
            else:
                last_eliminated = head + step
        
        if left_to_right or remaining % 2 == 1:
            head += step
        
        remaining //= 2
        step *= 2
        left_to_right = not left_to_right
    
    return last_eliminated


# Alternative: Use recursion with complement
def lastEliminated_recursive(n):
    """
    The last eliminated is the first to be removed in reverse elimination
    """
    # Get last remaining
    last_remaining = lastRemaining(n)
    
    # In final pass, the other number was eliminated
    # This requires tracking the penultimate state
    # More complex - better to track during simulation
    
    return last_remaining  # Placeholder
```

---

## Pattern 3: K-Step Elimination (Josephus Problem Variation)

### 📖 Problem Statement

Instead of eliminating every **2nd** number, eliminate every **k-th** number.

**Example:**
```
n = 7, k = 3

Pass 1: [1, 2, 3, 4, 5, 6, 7]
        Count 3: eliminate 3
        [1, 2, 4, 5, 6, 7]
        
        Count 3: eliminate 6
        [1, 2, 4, 5, 7]
        
        Count 3: eliminate 2
        [1, 4, 5, 7]
        
        ... continue until one remains
```

### ⚡ Approach: Josephus Problem Formula

```python
def josephus(n, k):
    """
    Josephus problem: n people in circle, eliminate every k-th
    
    Time: O(n)
    Space: O(1)
    """
    result = 0  # 0-indexed
    
    for i in range(2, n + 1):
        result = (result + k) % i
    
    return result + 1  # Convert to 1-indexed


def josephus_recursive(n, k):
    """
    Recursive version
    """
    if n == 1:
        return 1
    else:
        return (josephus_recursive(n - 1, k) + k - 1) % n + 1
```

**JavaScript:**

```javascript
function josephus(n, k) {
    let result = 0; // 0-indexed
    
    for (let i = 2; i <= n; i++) {
        result = (result + k) % i;
    }
    
    return result + 1; // Convert to 1-indexed
}
```

**Mathematical Derivation:**

```
J(n, k) = (J(n-1, k) + k) % n

Where:
  J(n, k) = position of survivor with n people, every k-th eliminated
  
Base case: J(1, k) = 0 (0-indexed)

Example: n=5, k=2

J(1, 2) = 0
J(2, 2) = (0 + 2) % 2 = 0
J(3, 2) = (0 + 2) % 3 = 2
J(4, 2) = (2 + 2) % 4 = 0
J(5, 2) = (0 + 2) % 5 = 2

Answer: position 2 (0-indexed) = position 3 (1-indexed)
```

---

## Pattern 4: Bidirectional Elimination with Custom Start

### 📖 Problem Statement

Start elimination from a custom position instead of always starting from position 1.

**Example:**
```
n = 9, start = 5

Pass 1 (from 5, L→R): [1, 2, 3, 4, 5, 6, 7, 8, 9]
                       Starting at 5: eliminate 5, 7, 9, 2, 4
                       Remaining: [1, 3, 6, 8]

... continue
```

### ⚡ Approach

Modify the standard approach with offset:

```python
def lastRemainingCustomStart(n, start):
    """
    Elimination game starting from custom position
    
    Time: O(log n)
    Space: O(1)
    """
    # Normalize to 1-indexed
    offset = start - 1
    head = 1
    step = 1
    remaining = n
    left_to_right = True
    
    while remaining > 1:
        if left_to_right or remaining % 2 == 1:
            head += step
        
        remaining //= 2
        step *= 2
        left_to_right = not left_to_right
    
    # Apply offset (circular)
    result = (head + offset - 1) % n + 1
    return result
```

---

## Pattern 5: Elimination with Survivor Count

### 📖 Problem Statement

Find the last **k** survivors instead of just 1.

**Example:**
```
n = 9, k = 3

Continue elimination until 3 numbers remain:

Pass 1 (L→R): [1, 2, 3, 4, 5, 6, 7, 8, 9]
              → [2, 4, 6, 8]

Pass 2 (R→L): [2, 4, 6, 8]
              → [2, 6]

We need 3, but only 2 remain. Go back one step:
              [2, 4, 6, 8] - this is too many

Need to stop when remaining becomes ≤ k
```

### ⚡ Approach

```python
def lastKRemaining(n, k):
    """
    Returns the last k survivors
    
    Time: O(log n)
    Space: O(k)
    """
    if k >= n:
        return list(range(1, n + 1))
    
    survivors = []
    head = 1
    step = 1
    remaining = n
    left_to_right = True
    
    while remaining > k:
        if left_to_right or remaining % 2 == 1:
            head += step
        
        remaining //= 2
        step *= 2
        left_to_right = not left_to_right
    
    # Reconstruct last k numbers
    for i in range(remaining):
        survivors.append(head + i * step)
    
    return survivors[:k]
```

**JavaScript:**

```javascript
function lastKRemaining(n, k) {
    if (k >= n) {
        return Array.from({length: n}, (_, i) => i + 1);
    }
    
    const survivors = [];
    let head = 1;
    let step = 1;
    let remaining = n;
    let leftToRight = true;
    
    while (remaining > k) {
        if (leftToRight || remaining % 2 === 1) {
            head += step;
        }
        
        remaining = Math.floor(remaining / 2);
        step *= 2;
        leftToRight = !leftToRight;
    }
    
    // Reconstruct last k numbers
    for (let i = 0; i < k && i < remaining; i++) {
        survivors.push(head + i * step);
    }
    
    return survivors;
}
```

---

## Pattern 6: Two-Pointer Elimination (Converging)

### 📖 Problem Statement

Instead of alternating direction, eliminate from both ends simultaneously until they meet.

**Example:**
```
n = 9

Step 1: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        Eliminate 1 (left) and 9 (right)
        [2, 3, 4, 5, 6, 7, 8]

Step 2: [2, 3, 4, 5, 6, 7, 8]
        Eliminate 2 (left) and 8 (right)
        [3, 4, 5, 6, 7]

Step 3: [3, 4, 5, 6, 7]
        Eliminate 3 (left) and 7 (right)
        [4, 5, 6]

Step 4: [4, 5, 6]
        Eliminate 4 (left) and 6 (right)
        [5]

Answer: 5
```

### ⚡ Approach

```python
def eliminationTwoPointer(n):
    """
    Eliminate from both ends simultaneously
    
    Time: O(log n)
    Space: O(1)
    """
    left = 1
    right = n
    step = 1
    is_left_turn = True
    
    while left < right:
        if is_left_turn:
            left += step
        else:
            right -= step
        
        # Only one elimination per round from alternating sides
        is_left_turn = not is_left_turn
        
        # If they're about to cross, we're done
        if left >= right:
            break
    
    return left
```

---

## 📊 Comparison Table

| Pattern | Input | Approach | Time | Space | Key Idea |
|---------|-------|----------|------|-------|----------|
| **Standard** | n | Track head | O(log n) | O(1) | Head changes pattern |
| **Last Eliminated** | n | Simulation | O(n) | O(n) | Track eliminated |
| **K-Step (Josephus)** | n, k | DP formula | O(n) | O(1) | Recurrence relation |
| **Custom Start** | n, start | Offset head | O(log n) | O(1) | Apply rotation |
| **K Survivors** | n, k | Stop early | O(log n) | O(k) | Reconstruct survivors |
| **Two-Pointer** | n | Converging | O(log n) | O(1) | Simultaneous elimination |

---

## 🧠 Pattern Recognition

### When to Use Each Pattern

| Pattern | When to Use |
|---------|-------------|
| **Standard Elimination** | Classic alternating direction problem |
| **Josephus** | Every k-th person eliminated in circle |
| **Custom Start** | Non-standard starting position |
| **K Survivors** | Need multiple final values |
| **Two-Pointer** | Symmetric elimination from both ends |

---

## 💡 Key Insights

### Standard Elimination Game

1. **Don't simulate** - Track the head position
2. **Head changes when:**
   - Moving left-to-right (always), OR
   - Moving right-to-left with odd count
3. **Step doubles** after each pass
4. **Count halves** after each pass

### Josephus Problem

1. **Recurrence relation:** `J(n, k) = (J(n-1, k) + k) % n`
2. **Base case:** `J(1, k) = 0` (0-indexed)
3. **Can optimize** for special cases (k=2 has pattern)

### Space Optimization

1. **Never store the array** for large n
2. **Track positions mathematically**
3. **Use formulas** instead of simulation

---

## 🎯 Practice Problems

### ⭐ Beginner

**1. Elimination Game** (LeetCode 390)
   - Standard left-right alternating elimination
   - Difficulty: ⭐⭐⭐

**2. Find the Winner of the Circular Game** (LeetCode 1823)
   - Josephus problem with k=2
   - Difficulty: ⭐⭐

### ⭐⭐ Intermediate

**3. Last Remaining Number in Array** (Custom)
   - Multiple elimination patterns
   - Difficulty: ⭐⭐⭐

**4. Josephus Problem** (Classic)
   - General k-step elimination
   - Difficulty: ⭐⭐⭐

### ⭐⭐⭐ Advanced

**5. Survivor Game with Power-ups** (Custom)
   - Elimination with special rules
   - Difficulty: ⭐⭐⭐⭐

**6. Multi-round Elimination** (Custom)
   - Multiple elimination phases
   - Difficulty: ⭐⭐⭐⭐

---

## 🔍 Common Pitfalls

❌ **Simulating with arrays** for large n (causes MLE/TLE)

❌ **Wrong head update logic** for right-to-left passes

❌ **Off-by-one errors** in step calculations

❌ **Forgetting to handle edge cases** (n=1, n=2)

❌ **Not considering odd/even count** in direction changes

---

## 🚀 Optimization Techniques

### 1. Mathematical Pattern Recognition
```python
# Instead of:
while len(arr) > 1:
    arr = eliminate(arr)  # O(n) per iteration

# Use:
while remaining > 1:
    head += step  # O(1) per iteration
    remaining //= 2
    step *= 2
```

### 2. Bit Manipulation for Powers of 2
```python
# For k=2 Josephus, there's a pattern
def josephus_k2(n):
    # Find highest power of 2 ≤ n
    p = 1
    while p * 2 <= n:
        p *= 2
    
    # Answer is 2 * (n - p) + 1
    return 2 * (n - p) + 1
```

### 3. Closed-Form Solutions
```python
# For specific k values in Josephus
def josephus_k3(n):
    # There are closed-form solutions for small k
    # k=2: 2*(n - 2^floor(log2(n))) + 1
    # k=3: More complex pattern
    pass
```

---

## 📖 Mathematical Background

### Why Head Changes Pattern Works

When eliminating every 2nd element:
- **Left-to-right:** First element always eliminated → head moves
- **Right-to-left:** 
  - If odd count: Last elimination wraps to first → head moves
  - If even count: Last elimination stops before first → head stays

**Example:**
```
[2, 4, 6, 8] (even count, R→L)
 ↑           ↑
head       last

Eliminate: 8, 6, 4
Head stays at 2 ✓

[2, 4, 6] (odd count, R→L)
 ↑        ↑
head    last

Eliminate: 6, 4, 2
Head moves to 4 ✓ (wait, no...)

Actually [2, 4, 6] R→L:
Start from right: 6 (eliminate), 4 (keep), 2 (eliminate)
Remaining: [4]
So head moves from 2 to 4
```

### Josephus Recurrence

```
Why J(n, k) = (J(n-1, k) + k) % n?

After first elimination (k-th person):
- Remaining n-1 people
- Renumber: person at position k+1 becomes position 0
- Solve J(n-1, k) in renumbered system
- Convert back: add k and mod n
```

---

## 🎓 Additional Resources

- [LeetCode 390 - Elimination Game](https://leetcode.com/problems/elimination-game/)
- [LeetCode 1823 - Find Winner of Circular Game](https://leetcode.com/problems/find-the-winner-of-the-circular-game/)
- [Josephus Problem - Wikipedia](https://en.wikipedia.org/wiki/Josephus_problem)
- [Mathematical Analysis of Josephus](https://www.geeksforgeeks.org/josephus-problem-set-1-a-on-solution/)

---

## 💻 Complete Solutions

### Standard Elimination Game (All Languages)

**Python:**
```python
def lastRemaining(n: int) -> int:
    head = 1
    step = 1
    remaining = n
    left_to_right = True
    
    while remaining > 1:
        if left_to_right or remaining % 2 == 1:
            head += step
        
        remaining //= 2
        step *= 2
        left_to_right = not left_to_right
    
    return head
```

**JavaScript:**
```javascript
function lastRemaining(n) {
    let head = 1, step = 1, remaining = n, leftToRight = true;
    
    while (remaining > 1) {
        if (leftToRight || remaining % 2 === 1) head += step;
        remaining >>= 1;
        step <<= 1;
        leftToRight = !leftToRight;
    }
    
    return head;
}
```

**Java:**
```java
public int lastRemaining(int n) {
    int head = 1, step = 1, remaining = n;
    boolean leftToRight = true;
    
    while (remaining > 1) {
        if (leftToRight || remaining % 2 == 1) {
            head += step;
        }
        remaining /= 2;
        step *= 2;
        leftToRight = !leftToRight;
    }
    
    return head;
}
```

**C++:**
```cpp
int lastRemaining(int n) {
    int head = 1, step = 1, remaining = n;
    bool leftToRight = true;
    
    while (remaining > 1) {
        if (leftToRight || remaining % 2 == 1) {
            head += step;
        }
        remaining >>= 1;
        step <<= 1;
        leftToRight = !leftToRight;
    }
    
    return head;
}
```

---

**Happy Eliminating! 🎯**
