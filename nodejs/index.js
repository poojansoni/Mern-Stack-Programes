console.log("Hello Universe");
const a = 25;
const b = 9.9;
console.log(`a = ${a}\nb = ${b}\nTotal =`,a+b);

var add = (...arr) => 
{
    sum = 0;
    arr.forEach(element => 
    {
        sum += element;
    });
    console.log(sum);
}

add(1,2,3,5,6,7,8,9,10)