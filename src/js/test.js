var numbers = [1, 2, 3, 4, 5];
var needle = [1, 3, 5];

numbers.forEach(function(number) {
	console.log(number)
    switch(number) {
        case needle[number]:
            console.log('found!',number,needle[item]);
    }
})