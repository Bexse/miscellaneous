let mathScore = [
  ["John Doe", 20, 60, "A"],
  ["Jane Doe", 10, 52, "B"],
  ["Petr Chess", 5, 24, "F"],
  ["Ling Jess", 28, 43, "A"],
  ["Ben Liard", 16, 51, "B"],
];
//console.table(mathScore);
console.log(mathScore [mathScore.length - 1][(mathScore[mathScore.length -1].length -1)]);

let numberArr = [
  [10, 20, 60],
  [8, 10, 52],
  [15, 5, 24],
  [26, 28, 43],
  [12, 16, 51]
];

let sum = 0;
numberArr.forEach((row)=>{
    row.forEach((ele)=> {
        sum+=ele;
    })
});

const sumTwoDarrays = (arr) => {
    let total = 0;

    for (let i = 0; i<arr.length; i++){
        for (let j=0; j<arr[i].length; j++){
            total+= arr[i][j]
        }
    }
 return total;

}

console.log(sumTwoDarrays(numberArr));