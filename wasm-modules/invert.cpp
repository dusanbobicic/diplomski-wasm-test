#include <emscripten.h>

extern "C"
{

	void invertImage(unsigned char* data, int len)
	{
		for (int i = 0; i < len; i += 4)
		{
			data[i] = 255 - data[i]; //red channel
			data[i + 1] = 255 - data[i + 1]; // green channel
			data[i + 2] = 255 - data[i + 2]; // blue channel
		}
	}

}

