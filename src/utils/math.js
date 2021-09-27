function fact(x) {
	let i = 2n, mul = 1n;
	while (i <= x) {
		mul *= i;
		i++;
	}
	return mul;
}
export function sumFactFibo(n)
{
	if (n < 2) {
		return 1;
	}
	if (n < 3) {
		return 2;
	}

	let a = 1, b = 1,c,sum=2n,i=3;
	while (i <= n) {
		sum = sum + BigInt(fact(a + b));
		c = a + b;
		a = b;
		b = c;
		i++;
	}
	return sum;
}