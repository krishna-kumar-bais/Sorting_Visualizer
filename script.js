class SortingVisualizer {
    constructor() {
        this.canvas = document.getElementById('visualization-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.array = [];
        this.arraySize = 50;
        this.speed = 5;
        this.isRunning = false;
        this.isPaused = false;
        this.currentAlgorithm = 'bubble';
        this.animationId = null;
        this.statistics = {
            comparisons: 0,
            swaps: 0,
            startTime: 0
        };

        this.colors = {
            unsorted: '#3498db',
            comparing: '#e74c3c',
            swapping: '#f39c12',
            sorted: '#2ecc71',
            pivot: '#9b59b6',
            auxiliary: '#95a5a6'
        };

        this.algorithmInfo = {
            bubble: {
                name: 'Bubble Sort',
                description: 'Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
                bestComplexity: 'O(n)',
                avgComplexity: 'O(n²)',
                worstComplexity: 'O(n²)',
                spaceComplexity: 'O(1)'
            },
            selection: {
                name: 'Selection Sort',
                description: 'Selection sort finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
                bestComplexity: 'O(n²)',
                avgComplexity: 'O(n²)',
                worstComplexity: 'O(n²)',
                spaceComplexity: 'O(1)'
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'Insertion sort builds the sorted array one element at a time by inserting each element into its correct position.',
                bestComplexity: 'O(n)',
                avgComplexity: 'O(n²)',
                worstComplexity: 'O(n²)',
                spaceComplexity: 'O(1)'
            },
            merge: {
                name: 'Merge Sort',
                description: 'Merge sort divides the array into halves, recursively sorts them, and then merges the sorted halves.',
                bestComplexity: 'O(n log n)',
                avgComplexity: 'O(n log n)',
                worstComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)'
            },
            quick: {
                name: 'Quick Sort',
                description: 'Quick sort selects a pivot element and partitions the array around it, then recursively sorts the subarrays.',
                bestComplexity: 'O(n log n)',
                avgComplexity: 'O(n log n)',
                worstComplexity: 'O(n²)',
                spaceComplexity: 'O(log n)'
            }
        };

        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.generateArray();
        this.updateAlgorithmInfo();
    }

    setupCanvas() {
        this.canvas.width = Math.min(800, window.innerWidth - 80);
        this.canvas.height = 400;
    }

    setupEventListeners() {
        document.getElementById('algorithm-select').addEventListener('change', (e) => {
            this.currentAlgorithm = e.target.value;
            this.updateAlgorithmInfo();
            if (!this.isRunning) this.generateArray();
        });

        document.getElementById('array-size').addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            document.getElementById('size-value').textContent = this.arraySize;
            if (!this.isRunning) this.generateArray();
        });

        document.getElementById('speed').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speed-value').textContent = this.speed;
        });

        document.getElementById('generate-btn').addEventListener('click', () => {
            if (!this.isRunning) this.generateArray();
        });

        document.getElementById('start-btn').addEventListener('click', () => {
            this.startSorting();
        });

        document.getElementById('stop-btn').addEventListener('click', () => {
            this.stopSorting();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetVisualization();
        });

        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.drawArray();
        });
    }

    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push({
                value: Math.floor(Math.random() * (this.canvas.height - 100)) + 10,
                state: 'unsorted'
            });
        }
        this.resetStatistics();
        this.drawArray();
    }

    drawArray() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const barWidth = this.canvas.width / this.arraySize;
        const maxHeight = this.canvas.height - 20;

        for (let i = 0; i < this.array.length; i++) {
            const bar = this.array[i];
            const barHeight = (bar.value / maxHeight) * (this.canvas.height - 40);
            const x = i * barWidth;
            const y = this.canvas.height - barHeight - 10;

            this.ctx.fillStyle = this.colors[bar.state] || this.colors.unsorted;
            this.ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

            // Add border for better visibility
            this.ctx.strokeStyle = '#34495e';
            this.ctx.lineWidth = 0.5;
            this.ctx.strokeRect(x + 1, y, barWidth - 2, barHeight);

            // Show value on top for smaller arrays
            if (this.arraySize <= 20) {
                this.ctx.fillStyle = '#2c3e50';
                this.ctx.font = '12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(Math.round(bar.value), x + barWidth/2, y - 5);
            }
        }
    }

    updateAlgorithmInfo() {
        const info = this.algorithmInfo[this.currentAlgorithm];
        document.getElementById('algo-name').textContent = info.name;
        document.getElementById('algo-description').textContent = info.description;
        document.getElementById('best-complexity').textContent = info.bestComplexity;
        document.getElementById('avg-complexity').textContent = info.avgComplexity;
        document.getElementById('worst-complexity').textContent = info.worstComplexity;
        document.getElementById('space-complexity').textContent = info.spaceComplexity;
    }

    resetStatistics() {
        this.statistics = { comparisons: 0, swaps: 0, startTime: 0 };
        this.updateStatistics();
    }

    updateStatistics() {
        document.getElementById('comparisons').textContent = this.statistics.comparisons;
        document.getElementById('swaps').textContent = this.statistics.swaps;
        const elapsedTime = this.statistics.startTime ? Date.now() - this.statistics.startTime : 0;
        document.getElementById('time').textContent = elapsedTime + 'ms';
    }

    async startSorting() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.statistics.startTime = Date.now();
        this.setButtonStates(true);

        // Reset array states
        this.array.forEach(bar => bar.state = 'unsorted');

        try {
            switch (this.currentAlgorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
                case 'quick':
                    await this.quickSort(0, this.array.length - 1);
                    break;
            }

            // Mark all as sorted
            this.array.forEach(bar => bar.state = 'sorted');
            this.drawArray();
            
        } catch (error) {
            console.error('Sorting interrupted:', error);
        } finally {
            this.isRunning = false;
            this.setButtonStates(false);
            this.updateStatistics();
        }
    }

    stopSorting() {
        this.isRunning = false;
        if (this.animationId) {
            clearTimeout(this.animationId);
            this.animationId = null;
        }
        this.setButtonStates(false);
    }

    resetVisualization() {
        this.stopSorting();
        this.generateArray();
    }

    setButtonStates(isRunning) {
        document.getElementById('start-btn').disabled = isRunning;
        document.getElementById('stop-btn').disabled = !isRunning;
        document.getElementById('generate-btn').disabled = isRunning;
        document.getElementById('reset-btn').disabled = isRunning;
        document.getElementById('array-size').disabled = isRunning;
        document.getElementById('algorithm-select').disabled = isRunning;
    }

    async sleep(ms) {
        const delay = 1000 / this.speed;
        return new Promise(resolve => {
            this.animationId = setTimeout(resolve, delay);
        });
    }

    async compare(i, j) {
        if (!this.isRunning) throw new Error('Sorting stopped');
        
        this.statistics.comparisons++;
        this.array[i].state = 'comparing';
        this.array[j].state = 'comparing';
        this.drawArray();
        await this.sleep();
        this.updateStatistics();
        
        return this.array[i].value > this.array[j].value;
    }

    async swap(i, j) {
        if (!this.isRunning) throw new Error('Sorting stopped');
        
        this.statistics.swaps++;
        this.array[i].state = 'swapping';
        this.array[j].state = 'swapping';
        this.drawArray();
        await this.sleep();

        // Perform the swap
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;

        this.drawArray();
        await this.sleep();
        this.updateStatistics();
    }

    // Bubble Sort Implementation
    async bubbleSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (await this.compare(j, j + 1)) {
                    await this.swap(j, j + 1);
                }
                
                // Reset states
                this.array[j].state = 'unsorted';
                this.array[j + 1].state = 'unsorted';
            }
            // Mark the last element as sorted
            this.array[n - i - 1].state = 'sorted';
        }
        this.array[0].state = 'sorted';
    }

    // Selection Sort Implementation
    async selectionSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            this.array[i].state = 'comparing';
            
            for (let j = i + 1; j < n; j++) {
                this.array[j].state = 'comparing';
                this.drawArray();
                await this.sleep();
                
                this.statistics.comparisons++;
                if (this.array[j].value < this.array[minIdx].value) {
                    if (minIdx !== i) this.array[minIdx].state = 'unsorted';
                    minIdx = j;
                } else {
                    this.array[j].state = 'unsorted';
                }
                this.updateStatistics();
            }
            
            if (minIdx !== i) {
                await this.swap(i, minIdx);
            }
            
            this.array[i].state = 'sorted';
            if (minIdx !== i) this.array[minIdx].state = 'unsorted';
        }
        this.array[n - 1].state = 'sorted';
    }

    // Insertion Sort Implementation
    async insertionSort() {
        const n = this.array.length;
        this.array[0].state = 'sorted';
        
        for (let i = 1; i < n; i++) {
            const key = this.array[i];
            key.state = 'comparing';
            this.drawArray();
            await this.sleep();
            
            let j = i - 1;
            
            while (j >= 0) {
                this.array[j].state = 'comparing';
                this.drawArray();
                await this.sleep();
                
                this.statistics.comparisons++;
                this.updateStatistics();
                
                if (this.array[j].value > key.value) {
                    this.array[j].state = 'swapping';
                    this.array[j + 1] = this.array[j];
                    this.array[j + 1].state = 'swapping';
                    this.statistics.swaps++;
                    this.drawArray();
                    await this.sleep();
                    j--;
                } else {
                    this.array[j].state = 'sorted';
                    break;
                }
                
                if (j >= 0) this.array[j].state = 'sorted';
            }
            
            this.array[j + 1] = key;
            this.array[j + 1].state = 'sorted';
            this.drawArray();
            await this.sleep();
        }
    }

    // Merge Sort Implementation
    async mergeSort(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArr = [];
        const rightArr = [];
        
        // Copy data to temporary arrays
        for (let i = left; i <= mid; i++) {
            leftArr.push({...this.array[i]});
        }
        for (let j = mid + 1; j <= right; j++) {
            rightArr.push({...this.array[j]});
        }
        
        let i = 0, j = 0, k = left;
        
        // Merge the temporary arrays back
        while (i < leftArr.length && j < rightArr.length) {
            // Highlight the elements being compared
            for (let x = left; x <= right; x++) {
                this.array[x].state = 'comparing';
            }
            this.drawArray();
            await this.sleep();
            
            this.statistics.comparisons++;
            this.updateStatistics();
            
            if (leftArr[i].value <= rightArr[j].value) {
                this.array[k] = leftArr[i];
                this.array[k].state = 'swapping';
                i++;
            } else {
                this.array[k] = rightArr[j];
                this.array[k].state = 'swapping';
                j++;
            }
            
            this.statistics.swaps++;
            this.drawArray();
            await this.sleep();
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArr.length) {
            this.array[k] = leftArr[i];
            this.array[k].state = 'swapping';
            this.statistics.swaps++;
            this.drawArray();
            await this.sleep();
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            this.array[k] = rightArr[j];
            this.array[k].state = 'swapping';
            this.statistics.swaps++;
            this.drawArray();
            await this.sleep();
            j++;
            k++;
        }
        
        // Mark merged portion as sorted if it's the final merge
        for (let x = left; x <= right; x++) {
            this.array[x].state = (left === 0 && right === this.array.length - 1) ? 'sorted' : 'unsorted';
        }
    }

    // Quick Sort Implementation
    async quickSort(low, high) {
        if (low < high) {
            const pivotIndex = await this.partition(low, high);
            await this.quickSort(low, pivotIndex - 1);
            await this.quickSort(pivotIndex + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        pivot.state = 'pivot';
        this.drawArray();
        await this.sleep();
        
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            this.array[j].state = 'comparing';
            this.drawArray();
            await this.sleep();
            
            this.statistics.comparisons++;
            this.updateStatistics();
            
            if (this.array[j].value < pivot.value) {
                i++;
                if (i !== j) {
                    await this.swap(i, j);
                }
                this.array[i].state = 'unsorted';
            }
            this.array[j].state = 'unsorted';
        }
        
        await this.swap(i + 1, high);
        this.array[i + 1].state = 'sorted';
        
        return i + 1;
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
