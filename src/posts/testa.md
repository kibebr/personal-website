---
tags: post
layout: blog.liquid
title: 'I made a game in C run in a web browser and so can you'
---

It is undoubtedly true that most of the web is powered by Javascript nowadays; however, recent technologies such as WebAssembly are to change this scene — or, perhaps, some of it, as for reasons that will be noted later. In this article I will be demonstrating how I ported the well-known Snake game built with only C and [SDL](https://www.libsdl.org/index.php) to web browsers utilizing the aforementioned technology.

## What is WebAssembly?

You have most likely heard of the Assembly language — a low-level language with a strong link to the machine code instructions — as this sort of old and cryptic programming language; in simple terms, WebAssembly is the same thing (though not exactly Assembly), but capable of running in [_most_](https://caniuse.com/#feat=wasm) modern web browsers. One of the reasons it shines is the fact it is decoded and compiled to machine code, thus providing a way to run code on the web at near-native speed. Not only that, even though you could learn how to code WebAssembly by hand — which wouldn’t be efficient — , WebAssembly is rather used as a compilation target for low-level languages such as C, C++ and Rust; in Layman’s term, that means you can code in one of these languages, compile it to WebAssembly, and run it in the browser.

Although it is tempting to ditch Javascript — either because you hate it like I do or you want to see new technologies powering the web — and start using WebAssembly for all your web applications, **it is important to note that WebAssembly is not a substitute for Javascript**. Rather, you can think of JS and WASM as a couple, each taking care of specific parts of your web application. And no, WASM won’t replace Javascript in the near-future, and if it ever does, you will probably be retired by then. Therefore, when should we use WebAssembly? Per its official documentation:

- CPU intensive tasks such as games with heavy assets, math calculations, image/video editing, etc.

- Porting old other languages’ libraries and applications, thus providing portability and promoting cross-platform.

- Live video augmentation, VR and augmented reality (due to its low-latency).

- Or, in this case, porting a simple Snake game from C and SDL for the sake of it.

It is believed that the “script” in Javascript — which makes JS seem like a scripting language at first glance — will begin to be a reality with WASM doing the heavy-lifting and JS serving as a complement.

## Porting our Snake game built with C and SDL to WebAssembly

Enough with introductions — let’s actually learn how to compile our Snake game to WebAssembly and deploy it on the web. Recall I said compile, therefore we will need another tool that helps us convert our C code to WASM; that is [Emscripten](https://emscripten.org/), a toolchain that helps us compile C and C++ code into WebAssembly — in Layman’s term, if you ever coded in C or C++, you can think of it as a Clang or GCC that, instead of compiling to machine code, it compiles to WebAssembly. But… what about the SDL library? Lucky for us, since SDL is quite renowned in the game development industry, Emscripten supports it right off the bat.

### Setting up Emscripten

First, let’s install the prerequisites.

- **Windows**

You will need Python 2.7 or newer. You can easily download it through this [page](https://www.python.org/downloads/windows/).

- **Mac**

You will need [XCode and its command line tools.](https://superuser.com/questions/455214/where-is-svn-on-os-x-mountain-lion) Also, you will need to have [Git](https://git-scm.com/download/mac) and [CMake](https://cmake.org/install/) installed.

- **Linux**

```bash
# Install Python
sudo apt-get install python2.7

# Install CMake (optional, only needed for tests and building Binaryen)
sudo apt-get install cmake

# Install Java (optional, only needed for Closure Compiler minification)
sudo apt-get install default-jre
```

Great, now let’s install Emscripten itself. There’s two ways of downloading it: you can go to its [Github page](https://github.com/emscripten-core/emsdk) and press the green button titled “Download”, or cloning the repository using the command-line interface.

```bash
# Get the emsdk repo
git clone https://github.com/emscripten-core/emsdk.git

# Enter that directory
cd emsdk
```

Either way, once you are inside the directory, run the following commands:

```bash
# Fetch the latest version of the emsdk (not needed the first time you clone)
git pull

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh
```

NOTE: if you are using Windows, make sure to run `emsdk` instead of `./emsdk`, and `emsdk_env.bat` instead of `source ./emsdk_env.sh`.

Awesome, you are half-way there!

### Compiling our Snake game built with C and SDL to WebAssembly

Now that you have Emscripten set up in your OS, it’s time to make certain modifications in order to successfully run our game in the browser. First, code yourself something or, if you wish, head to the [source code](https://github.com/kibebr/sdl-to-wasm-games/tree/master/snake/src) of the game I have built as an demo for this article.

Head over to `main.c`, and I will walk you through the necessary changes made in order to make the game compile with Emscripten. As a comparison, [here’s the original `main.c`](https://gist.github.com/kibebr/d046c3977d783dbbd4d83616826e743c). As you can see, not that big of a difference: I added two functions that are of Emscripten and `#ifdef`s for conditional compilation. The rest of the source code is unchanged.

```c
#ifdef __EMSCRIPTEN__
    #include <emscripten.h>
#endif
```

In order to access Emscripten’s functions, we need to import them. In Layman’s term, the `#ifdef` serves to detect whether this code is being compiled to WebAssembly or machine code. If the former is true, then we need to include `emscripten.h`, otherwise it is not necessary.

Now let’s check out this piece of code:

```c
int main(int argc, char* args[])
{
    if(!init())
        return -1;
     else{
         #ifdef __EMSCRIPTEN__
             emscripten_set_main_loop(main_loop, 0, 1);
         #endif
         #ifndef __EMSCRIPTEN__
             while(running)
                 main_loop();
         #endif
     }

    quit_game();
    return 0;
}
```

If there was a error in the initialization of the game, return -1 and quit the game. Else, again we check if this game is being compiled with Emscripten; if it is, we need to use the `emscripten_set_main_loop()` function rather than just calling the function ourselves. Why? Infinite loops work in desktops, but they would crash your browser. Fortunately, Emscripten solves this issue by giving us a function that makes our `main_loop` function be called periodically rather than continuously. Here are the parameters of this function:

```c
emscripten_set_main_loop(
 mainloop, // callback function to main loop
 0, // frame rate (it is preferred to always use 0, requestAnimationFrame() will be used, making the animation smoother)
 1 // simulate infinite loop
);
```

Otherwise, if we are not compiling the game using Emscripten, then we can simply call the `main_loop` function while the game is running.

Alright! Emscripten also gives us a function to be called when the game is over: `emscripten_cancel_main_loop()` . Notice I use it in my `quit_game` function:

```c
#ifdef __EMSCRIPTEN__
    emscripten_cancel_main_loop();
#endif
```

Boom, that’s it! We are ready to compile our game to WASM and run it in our browser!

Open your command-line interface tool, head over to the Snake’s game source code folder (a folder called `src`). As an example, here is how I would do it in using Linux:

```bash
$ cd snake

$ cd src

$ ls // displays all the files in the current directory, use it to make sure you are in the correct one
```

Now, let’s type the following command to compile the game:

```bash
$ emcc \
 -o app.html *.c \
 -Wall -g -lm \
 -s USE_SDL=2
```

That’s it. If everything went well, you should be able to see three new files inside the `src` folder: `app.html` , `app.js` , and `app.wasm` . That `.wasm` is our compiled WebAssembly code.

How can you see it in your browser? Pretty straightforward: type `python -m SimpleHTTPServer 8080` to host a local web server and head to [http://localhost:8080/app.html](http://localhost:8080/hello.html) to see the Snake game up and running!

Simple as that — [check out the Snake game running in your browser!](https://kibebr.github.io/sdl-to-wasm-games/)

As a side note: of course, Emscripten is a large — and fortunately, well-documented — tool filled with oftentimes necessary complexities in order to make complex games and applications properly work in the browser. However, for the sake of this article’s length — as in, this is a mere introduction to Emscripten and its capabilities — we have only done the minimum necessary to make our simple Snake game run in the browser. If you wish to dive deep with Emscripten, don’t forget to take a look at its [documentation](https://emscripten.org/docs/)!

