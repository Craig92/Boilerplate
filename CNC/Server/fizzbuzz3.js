var fizz = function* () {
    let i = 0;
    while (++i) {
        var is_fizz = i % 3 === 0;
        var is_buzz = i % 5 === 0;
        
      yield(
      is_fizz?(
      is_buzz?'FizzBuzz':'Fizz'
      ):(
      is_buzz?'Buzz':''+i
      )
      )
    }
};


var generator = fizz();
for (let i = 0; i < 100; i++) {
    console.log(generator.next().value);
}