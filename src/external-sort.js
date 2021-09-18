const { produceOutput } = require("./data-output-producer");
const { getFilesNames, getValue, addOutputValue, writeFirstOutputValue } = require("./FileHandler");
const lockFile = require('lockfile')

class HeapNode{
    constructor(value , filename , index)
    {
        this.value = value;
        this.filename = filename
        this.index = index
    }
}

class Heap
{
    minHeap(arr)
    {
        for(let index = parseInt((arr.length / 2) -1) ; index > -1; index--)
        {
            this.heapify(arr , arr.length , index);
        }
    }

    heapify(arr , size , index)
    {
        let largestIndex = index;
        let leftIndex = 2*index +1;
        let rightIndex = 2*index +2;

        if(leftIndex < size && arr[leftIndex].value < arr[largestIndex].value)
        {
            largestIndex = leftIndex;
        }
        if(rightIndex < size && arr[rightIndex].value < arr[largestIndex].value)
        {
            largestIndex = rightIndex;
        }
        if(largestIndex != index)
        {
            // swap
            [arr[index] , arr[largestIndex]] = [arr[largestIndex] , arr[index]];
    
            this.heapify(arr , size , largestIndex)
        }
    }

    insert(arr , value)
    {
        if(!arr.length)
        {
            arr = [value];
        }
        else{
            arr.push(value);
            this.minHeap(arr);
        }
        return arr;
    }
}

var heap = new Heap();

const sort = async () => {
    // initialize file
    lockFile.lock('./temp/sorting-file.lock', {
        wait: 5000,
        stale: 2000
    }, async function  (error) {
        if(error)
        {
            return console.log('Something went wrong when acquiring a lock.' , error)
        }

        writeFirstOutputValue("");
        const filenames = await getFilesNames();
        let arr = [];
        for(filename of filenames)
        {
            let {value} = await getValue(filename , 0);
            if(value !== null)
            {
                let node = new HeapNode(value , filename , 0);
                arr.push(node);
            }
        }
        heap.minHeap(arr);
        await externalSorting(arr);

        lockFile.unlock('some-file.lock', function (error) {
          if(error)
          {
              console.log('Something went wrong when relaising a lock.' , error)
          }
        })
      })
}

const externalSorting = async (arr) => {
    if(arr.length)
    {
        const root = arr[0];
        
        addOutputValue(root.value);
        
        produceOutput(root.value);
        
        arr.shift();
        heap.minHeap(arr);
        
        const {value} = await getValue(root.filename , root.index + 1);
        if(value !== null)
        {
            node = new HeapNode(value , root.filename , root.index + 1);
            arr = heap.insert(arr , node);
        }
        await externalSorting(arr);
    }
}

sort();

module.exports = {
    externalSort : sort
}