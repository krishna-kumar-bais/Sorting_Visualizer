# Sorting Algorithm Visualizer

A comprehensive web-based visualization tool that demonstrates how different sorting algorithms work step by step. This interactive application helps users understand the mechanics of various sorting algorithms through visual animations.

## Features

### Supported Sorting Algorithms
- **Selection Sort**: Finds the minimum element and places it at the beginning
- **Bubble Sort**: Compares adjacent elements and swaps them if they're in the wrong order
- **Insertion Sort**: Builds the sorted array one element at a time
- **Merge Sort**: Divides the array and merges sorted halves
- **Quick Sort**: Uses a pivot element to partition the array

### Interactive Controls
- **Algorithm Selection**: Choose from 5 different sorting algorithms
- **Array Size**: Adjustable from 3 to 20 elements
- **Animation Speed**: Control from slow (1) to fast (10)
- **Generate Array**: Create a new random array
- **Start/Stop/Reset**: Control the sorting animation

### Visual Features
- **Color-coded Elements**:
  - Blue: Unsorted elements
  - Red: Elements being compared
  - Orange: Elements being swapped
  - Green: Sorted elements
  - Purple: Pivot element (Quick Sort)
- **Real-time Statistics**: Track comparisons, swaps, and execution time
- **Algorithm Information**: View time and space complexity for each algorithm
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

1. Either open `index.html` in your web browser or [click here](https://krishna-kumar-bais.github.io/Sorting_Visualizer/
)
2. Select a sorting algorithm from the dropdown menu
3. Adjust the array size and speed using the sliders
4. Click "Generate New Array" to create a random array
5. Click "Start Sorting" to begin the visualization
6. Watch as the algorithm sorts the array step by step
7. Use "Stop" to halt the animation or "Reset" to start over

## Technical Details

### File Structure
```
Sorting Visualizer/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript logic and algorithms
└── README.md           # Project documentation
```

### Technologies Used
- **HTML5**: Structure and canvas element for visualization
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Algorithm implementation and DOM manipulation
- **Canvas API**: Drawing the array bars and animations

### Algorithm Implementations

#### Selection Sort
- **Time Complexity**:
  - **Worst Case**: O(n²)
  - **Average Case**: O(n²)
  - **Best Case**: O(n²)
- **Space Complexity**: O(1)
- Finds minimum element and places it in correct position

#### Bubble Sort
- **Time Complexity**:
  - **Worst Case**: O(n²)
  - **Average Case**: O(n²)
  - **Best Case**: O(n)
- **Space Complexity**: O(1)
- Compares adjacent elements and swaps them if needed

#### Insertion Sort
- **Time Complexity**:
  - **Worst Case**: O(n²)
  - **Average Case**: O(n²)
  - **Best Case**: O(n)
- **Space Complexity**: O(1)
- Inserts each element into its correct position in sorted portion

#### Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- Divides array recursively and merges sorted subarrays

#### Quick Sort
- **Time Complexity**:
  - **Worst Case**: O(n²)
  - **Average Case**: O(n log n)
- **Space Complexity**: O(log n)
- Uses pivot partitioning to sort subarrays

## Educational Value

This visualizer is perfect for:
- **Computer Science Students**: Understanding algorithm mechanics
- **Teachers/Instructors**: Demonstrating sorting concepts
- **Self-learners**: Visual learning of data structures and algorithms
- **Interview Preparation**: Understanding algorithm complexity and behavior

## Future Enhancements

Potential improvements could include:
- Additional sorting algorithms (Heap Sort, Radix Sort)
- Sound effects for comparisons and swaps
- Step-by-step mode for detailed analysis
- Export functionality for animations
- Comparison mode to run multiple algorithms simultaneously

## Contributing

Feel free to fork this project and submit pull requests for improvements or bug fixes. Some areas for contribution:
- Additional sorting algorithms
- UI/UX improvements
- Performance optimizations
- Mobile experience enhancements

