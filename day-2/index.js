/* DAY 2

   Now, you need to figure out how to pilot this thing.

   It seems like the submarine can take a series of commands like forward 1, down 2, or up 3:

   - forward X increases the horizontal position by X units.
   - down X increases the depth by X units.
   - up X decreases the depth by X units.

   Note that since you're on a submarine, down and up affect your depth, and so they have the
   opposite result of what you might expect.

   The submarine seems to already have a planned course (your puzzle input).
   You should probably figure out where it's going. For example:

   forward 5
   down 5
   forward 8
   up 3
   down 8
   forward 2

   Your horizontal position and depth both start at 0. The steps above would then modify them as
   follows:

   - forward 5 adds 5 to your horizontal position, a total of 5.
   - down 5 adds 5 to your depth, resulting in a value of 5.
   - forward 8 adds 8 to your horizontal position, a total of 13.
   - up 3 decreases your depth by 3, resulting in a value of 2.
   - down 8 adds 8 to your depth, resulting in a value of 10.
   - forward 2 adds 2 to your horizontal position, a total of 15.

   After following these instructions, you would have a horizontal position of 15 and a depth of 10.
   (Multiplying these together produces 150.)

   Calculate the horizontal position and depth you would have after following the planned course.
   What do you get if you multiply your final horizontal position by your final depth?


   Part Two: 

   Based on your calculations, the planned course doesn't seem to make any sense. You find the submarine
   manual and discover that the process is actually slightly more complicated.

   In addition to horizontal position and depth, you'll also need to track a third value, aim, which also
   starts at 0. The commands also mean something entirely different than your first thought:
   
   - down X increases your aim by X units.
   - up X decreases your aim by X units.
   - forward X does two things:
      - It increases your horizontal position by X units.
      - It increases your depth by your aim multiplied by X.


   Using this new interpretation of the commands, calculate the horizontal position and depth you would
   have after following the planned course.
   
   What do you get if you multiply your final horizontal position by your final depth?

*/

const fs = require("fs");

const data = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("\n");

class Submarine {
    constructor() {
	this.horizontal = 0;
	this.depth = 0;
    };

    forward(x) {
	this.horizontal += x;
    };

    up(x) {
	this.depth -= x;
    }

    down(x) {
	this.depth += x;
    }

    multiply() {
	return this.horizontal * this.depth;
    }    
};


class Bettermarine {
    constructor() {
	this.horizontal = 0;
	this.aim = 0;
	this.depth = 0;
    };

    forward(x) {
	this.horizontal += x;
	this.depth += (this.aim * x);
    };

    up(x) {
	this.aim -= x;
    }

    down(x) {
	this.aim += x;
    }

    multiply() {
	return this.horizontal * this.depth;
    }    
};


function partOne() {
    const marine = new Submarine();

    data.forEach((item, index) => {
	// parse
	const parsed = item.split(" ");
	const command = parsed[0];
	const amount = parsed[1];

	console.log(`command: ${command}, amount: ${amount}`);
	marine[command](parseInt(amount));
    });
    // finish
    console.log(`Final horizontal * depth pos = ${marine.multiply()}`);
    
}

function partTwo() {
    const marine = new Bettermarine();

    data.forEach((item, index) => {
	const parsed = item.split(" ");
	const command = parsed[0];
	const amount = parsed[1];

	marine[command](parseInt(amount));
    });
    console.log(`Final horizontal * depth pos = ${marine.multiply()}`);
};

partTwo();

