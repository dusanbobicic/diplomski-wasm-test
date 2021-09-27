#include <emscripten.h>

extern "C"
{

	EMSCRIPTEN_KEEPALIVE void grayScale_average(unsigned char* data, int len)
	{
		for (int i = 0; i < len; i += 4)
		{
			int r = data[i];
			int g = data[i + 1];
			int b = data[i + 2];
			int a = data[i + 3];
			int gValue = (r + g + b) / 3;
			data[i] = gValue;
			data[i + 1] = gValue;
			data[i + 2] = gValue;
			data[i + 3] = a;
		}
	}

	void grayScale_w1(unsigned char* data, int len)
	{
		for (int i = 0; i < len; i += 4)
		{
			int r = data[i];
			int g = data[i + 1];
			int b = data[i + 2];
			int a = data[i + 3];
			int gValue = (r * 0.3 + g * 0.59 + b * 0.11);
			data[i] = gValue;
			data[i + 1] = gValue;
			data[i + 2] = gValue;
			data[i + 3] = a;
		}
	}

	void grayScale_luma(unsigned char* data, int len)
	{
		for (int i = 0; i < len; i += 4)
		{
			int r = data[i];
			int g = data[i + 1];
			int b = data[i + 2];
			int a = data[i + 3];
			int gValue = (r * 0.2126 + g * 0.7152 + b * 0.0722);
			data[i] = gValue;
			data[i + 1] = gValue;
			data[i + 2] = gValue;
			data[i + 3] = a;
		}
	}

	void grayScale_GT601(unsigned char* data, int len)
	{
		for (int i = 0; i < len; i += 4)
		{
			int r = data[i];
			int g = data[i + 1];
			int b = data[i + 2];
			int a = data[i + 3];
			int gValue = (r * 0.2126 + g * 0.7152 + b * 0.0722);
			data[i] = gValue;
			data[i + 1] = gValue;
			data[i + 2] = gValue;
			data[i + 3] = a;
		}
	}
}