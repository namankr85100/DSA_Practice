# Two's Complement & LSB (Least Significant Bit)

Understanding how negative numbers work in binary and why `i & (-i)` gives us the LSB.

---

## 🤔 The Question: How Does -6 Come?

When we use the formula `i & (-i)` to find the LSB, we need to understand how `-6` is represented in binary.

---

## 📚 Understanding Two's Complement

Two's Complement is how computers represent negative numbers in binary.

### Steps to Convert Positive to Negative

To convert a positive number to its negative:

1. **Flip all bits** (invert/NOT operation)
2. **Add 1**

---

## 🔢 Example: Converting 6 to -6

### Step 1: Start with 6 in Binary (8-bit)

```
6 = 00000110
```

### Step 2: Flip All Bits (NOT operation)

Flip every 0 to 1 and every 1 to 0:

```
Original:  00000110
Flip:      11111001
```

### Step 3: Add 1

```
  11111001  (flipped bits)
+        1  (add 1)
-----------
  11111010  (result = -6)
```

So: **-6 = 11111010** (in 8-bit binary)

---

## ⚡ Visual Breakdown: 6 & (-6)

### Both Numbers in Binary

```
6  =  00000110
-6 =  11111010
```

### Bitwise AND Operation

```
  00000110  (6)
& 11111010  (-6)
-----------
  00000010  (2) ← This is the LSB!
```

Only the **rightmost set bit survives** the AND operation!

---

## 🎯 Why `i & (-i)` Isolates the LSB

When you perform AND with a number and its negative:

- All bits that are **1** in the original become **0** in the result (except the LSB)
- All bits that are **0** in the original become **0** in the result
- The **rightmost 1** (LSB) remains **1** in the result

**Result:** Only the LSB is left!

---

## 📊 More Examples

### Example 1: i = 12

```
12 in binary:  00001100
Flip bits:     11110011
Add 1:         11110100  (-12)

12  =  00001100
-12 =  11110100
       --------
       00000100  (LSB = 4)
```

### Example 2: i = 5

```
5 in binary:   00000101
Flip bits:     11111010
Add 1:         11111011  (-5)

5  =  00000101
-5 =  11111011
      --------
      00000001  (LSB = 1)
```

### Example 3: i = 8

```
8 in binary:   00001000
Flip bits:     11110111
Add 1:         11111000  (-8)

8  =  00001000
-8 =  11111000
      --------
      00001000  (LSB = 8)
```

---

## 📋 Summary Table

| i | Binary | -i | Binary | i & (-i) | LSB |
|---|--------|----|----|----------|-----|
| 6 | `00000110` | -6 | `11111010` | `00000010` | **2** |
| 12 | `00001100` | -12 | `11110100` | `00000100` | **4** |
| 5 | `00000101` | -5 | `11111011` | `00000001` | **1** |
| 8 | `00001000` | -8 | `11111000` | `00001000` | **8** |
| 3 | `00000011` | -3 | `11111101` | `00000001` | **1** |
| 16 | `00010000` | -16 | `11110000` | `00010000` | **16** |

---

## 💡 Key Insights

✅ **Two's Complement** is the standard way to represent negative numbers

✅ **Flip all bits + Add 1** = Convert positive to negative

✅ **i & (-i)** isolates the rightmost set bit (LSB)

✅ This works because only the LSB and its carry survive the operation

✅ Essential for algorithms like **Fenwick Trees**, **Segment Trees**, and **bit manipulation problems**

---

## 🚀 Applications

### 1. Fenwick Tree (Binary Indexed Tree)
```javascript
// Move to next responsible node
i += i & (-i);

// Move to parent node
i -= i & (-i);
```

### 2. Check if Power of 2
```javascript
// A number is power of 2 if i & (-i) === i
if ((i & (-i)) === i) {
    console.log("Power of 2!");
}
```

### 3. Count Set Bits (Brian Kernighan's Algorithm)
```javascript
let count = 0;
while (i > 0) {
    i &= i - 1;  // Similar principle
    count++;
}
```

---

## 🎓 Practice Problems

1. **Find the LSB of a number**
   - Input: `i = 20`
   - Output: `i & (-i)` = ?
   - Answer: `4` (because 20 = 10100, LSB = 100 = 4)

2. **Check if power of 2**
   - Use: `(i & (-i)) === i`

3. **Remove the rightmost set bit**
   - Use: `i & (i - 1)` (slightly different but related)

---

## 📖 References

- **Two's Complement:** Standard binary representation of negative integers
- **Bitwise Operations:** AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), Left Shift (`<<`), Right Shift (`>>`)
- **LSB:** Also called "Least Significant Bit" or "Trailing Bit"
- **MSB:** Most Significant Bit (leftmost)

---

## 🧠 Remember

> Two's Complement is not magic — it's just a clever mathematical trick that makes binary arithmetic work correctly for both positive and negative numbers!

The reason `i & (-i)` works is because:
- The negative number has all bits flipped + 1
- When ANDed together, everything cancels except the rightmost set bit
- This rightmost bit is exactly what we need!
