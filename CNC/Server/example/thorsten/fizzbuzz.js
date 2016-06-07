var fizz = function* () {
    let i = 0;
    while (++i) {
        var is_fizz = i % 3 === 0;
        var is_buzz = i % 5 === 0;
        var is_fizzbuzz = i % 15 === 0;
        if(is_fizzbuzz){
            yield 'FizzBuzz';
        }else if(is_fizz) {
            yield 'Fizz';
        }
        else if(is_buzz){
            yield 'Buzz';
        }
         else {
            yield '' + i;
        }
    }
};


var generator = fizz();
for (let i = 0; i < 100; i++) {
    console.log(generator.next().value);
}