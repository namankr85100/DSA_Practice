# Repository Structure

```
DSA_Practice/
│
├── README.md                          # Main repository guide
│
├── Concepts/                          # Fundamental CS concepts
│   ├── README.md
│   └── TwosComplement_and_LSB.md     # Binary & bit manipulation
│
├── DataStructures/                    # Core data structures
│   ├── README.md
│   ├── Tree/
│   │   ├── FenwickTree.md            # Binary Indexed Tree
│   │   └── SegmentTree.md            # Range query tree
│   ├── Array/                         # (Coming soon)
│   └── LinkedList/                    # (Coming soon)
│
├── Algorithms/                        # Algorithm implementations
│   ├── README.md
│   └── Sorting/
│       └── QuickSort.js              # O(n log n) sorting
│
└── Problems/                          # Problem-solving patterns
    ├── README.md
    ├── Stocks/
    │   └── BuyAndSellStock_AllPatterns.md  # All 6 LeetCode stock problems
    ├── TwoPointers/                   # (Coming soon)
    ├── SlidingWindow/                 # (Coming soon)
    ├── DynamicProgramming/            # (Coming soon)
    └── BinarySearch/                  # (Coming soon)
```

## 📊 Content Statistics

- **Total Files**: 10 markdown + 1 JavaScript
- **Data Structures**: 2 (Fenwick Tree, Segment Tree)
- **Algorithms**: 1 (QuickSort)
- **Problem Patterns**: 1 category (Stocks - 6 problems)
- **Concepts**: 1 (Two's Complement & LSB)

## 🎯 Organization Philosophy

### Why This Structure?

**Concepts/** - Foundational knowledge that applies everywhere
- Bit manipulation, complexity analysis, memory concepts

**DataStructures/** - Reusable building blocks
- Organized by type (Tree, Array, LinkedList, etc.)
- Each includes: theory, implementation, complexity

**Algorithms/** - Classic algorithm implementations
- Organized by category (Sorting, Searching, Graph, etc.)
- Focus on correctness and optimization

**Problems/** - Pattern-based problem solving
- Organized by technique (Two Pointers, DP, etc.)
- Multiple related problems showing pattern variations

## 📈 Growth Plan

As content grows, maintain this structure:

```
Problems/
├── DynamicProgramming/
│   ├── README.md                     # Overview of DP
│   ├── Knapsack_Problems.md          # 0/1, unbounded, bounded
│   ├── LIS_Variations.md             # LIS, LDS, LBS
│   └── GridProblems.md               # Unique paths, min path sum
```

## 🔍 File Naming Conventions

- **Data Structures**: `StructureName.md` (e.g., `FenwickTree.md`)
- **Algorithms**: `AlgorithmName.js` or `.py` (e.g., `QuickSort.js`)
- **Problem Patterns**: `ProblemFamily_Pattern.md` (e.g., `BuyAndSellStock_AllPatterns.md`)
- **Concepts**: `TopicName.md` (e.g., `TwosComplement_and_LSB.md`)

## 💡 Navigation Tips

1. **Start at main README.md** for overview
2. **Check category README** for specific topics
3. **Use Quick Links** for direct access to content
4. **Follow study paths** in each README for learning order

## 🚀 Contribution Guidelines

When adding new content:

1. **Choose correct folder** based on content type
2. **Update category README** to list new content
3. **Add Quick Link** in main README if important
4. **Follow naming conventions**
5. **Include all sections**: theory, code, examples, problems
