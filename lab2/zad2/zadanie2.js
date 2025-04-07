export function sum(x,y) {
    return x+y;
}

export function sum_strings(a) {
    var sum = 0;
    console.log(a);
    for (const  el of a) {
        console.log(el);
        if (!isNaN(parseFloat(el))) {

            sum += parseFloat(el)
        }
    }
    return sum;
}

export function digits(s) {
    function is_even(num) {
        return num % 2 === 0;
    }

    let orginal_num = Number(s)
    let even_sum = 0;
    let odd_sum = 0;
    while (orginal_num > 0) {
        const rest = orginal_num % 10;
        if (is_even(rest)) {
            even_sum += rest;
        } else {
            odd_sum += rest;
        }
        Math.floor(orginal_num / 10)
    }
    return[odd_sum,even_sum];
}

export function letters(s) {
    let lower_case = 0;
    let upper_case = 0;
    for (const el of s) {
        if (el === el.toUpperCase()) {
            upper_case++;
        } else {
            lower_case++;
        }
    }
    return [lower_case, upper_case];
}