#include <emscripten.h>

extern "C"
{

	unsigned long long fact(long x) {
		int i = 2;
		unsigned long long mul = 1;
		while (i <= x) {
			mul *= i;
			i++;
		}
		return mul;
	}
	unsigned long long sumFactFibo(int n)
	{
		if (n < 2) {
			return 1;
		}
		if (n < 3) {
			return 2;
		}

		int a = 1, b = 1, c;
		unsigned long long sum = 2;
		int i = 3;
		while (i <= n) {
			sum += fact(a + b);
			c = a + b;
			a = b;
			b = c;
			i++;
		}
		return sum;
	}

}