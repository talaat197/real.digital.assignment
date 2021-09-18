
const partitions = [
    [1 , 2],
    [10 , 20],
    [0 , 0],
    [1,2,3,4,5,6],
    // [1,2,3,4,5,6],
    // [1,2,3,4,5,6],
    // [1,2,3,4,5,6],
    // [100,200,300,400,500,600],
    // [100,200,300,400,500,600],
    // [1,2,3,4,5,6]
]


const getInput = () => {
    let inputData = [];
    for(let index = 0; index < partitions.length ;index++)
    {
        for(let index2 = 0; index2 < partitions[index].length; index2++ )
        {
            inputData.push({
                value: "" + partitions[index][index2],
                partition: index,
                key: ""+index
            });
        }
    }

    return inputData;
}


module.exports = getInput