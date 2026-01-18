/**
 * QuickSort Algorithm
 * 
 * TIME COMPLEXITY:
 * - Best Case: O(n log n) - when pivot divides array evenly
 * - Average Case: O(n log n) - typical behavior
 * - Worst Case: O(n²) - when pivot is smallest/largest element
 * 
 * SPACE COMPLEXITY:
 * - O(log n) - recursion call stack depth (average case)
 * - O(n) - worst case (when recursion depth is n)
 * 
 * OPERATIONS COUNT:
 * Best/Average Case: ~n log n comparisons and swaps
 * - 1st pass: n comparisons, ~n/2 swaps on average
 * - 2nd pass: n/2 + n/2 comparisons, ~n/4 swaps per subarray
 * - Continues for log n levels
 * 
 * Worst Case: ~n² comparisons and swaps
 * - 1st pass: n comparisons, n-1 swaps
 * - 2nd pass: n-1 comparisons, n-2 swaps
 * - ... continues for n levels
 * 
 * CHARACTERISTICS:
 * - In-place sorting algorithm
 * - Not stable (equal elements may change relative order)
 * - Divide-and-conquer approach
 * - Cache-friendly due to sequential array access
 * - Often faster in practice than O(n log n) algorithms like merge sort
 */
function quickSort(arr, left =0, right = arr.length -1) {
    if (left < right) {
        let pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex -1);
        quickSort(arr, pivotIndex +1 , right);
    }
    return arr;
}

/**
 * Partition Helper Function
 * 
 * TIME COMPLEXITY: O(n) - scans through the subarray once
 * SPACE COMPLEXITY: O(1) - only uses constant extra space
 * 
 * OPERATIONS:
 * - 1 pivot assignment
 * - 2 pointer initializations (i, j)
 * - n comparisons (in while loops scanning from both ends)
 * - Up to (right - left) swaps in worst case
 * - 1 final pivot swap
 * 
 * Partitions the array around a pivot element such that:
 * - Elements smaller than pivot are on the left
 * - Elements greater than pivot are on the right
 */
function partition(arr, left, right) {
    let pivot = arr[left];
    let i = left + 1;
    let j = right;
    
    while(i <= j) {
        while( i <= right && arr[i] <= pivot) {
            i++
        }
        while(j >= left && arr[j] > pivot) {
            j--
        }
        if (i < j) {
            [arr[i], arr[j]]=[arr[j], arr[i]]
        }
    }
    [arr[left],arr[j]] = [arr[j], arr[left]];
    return j
}


const data = [40, 10, 100, 90, 20 ,60, 30];
console.log("Result", quickSort(data));

// https://www.dsavisualizer.in/visualizer/sorting/quicksort