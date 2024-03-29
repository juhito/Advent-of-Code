/*


  As the submarine drops below the surface of the ocean, it automatically performs a sonar sweep
  of the nearby sea floor. On a small screen, the sonar sweep report (your puzzle input) appears:
  
  each line is a measurement of the sea floor depth as the sweep looks further and further away from the
  submarine.

  For example, suppose you had the following report:

  199 
  200
  208
  210
  200
  207
  240
  269
  260
  263

  This report indicates that, scanning outward from the submarine, the sonar sweep found depths of
  199, 200, 208, 210, and so on.

  The first order of business is to figure out how quickly the depth increases, just so you know what
  you're dealing with - you never know if the keys will get carried into deeper water by an ocean current
  or a fish or something.

  To do this, count the number of times a depth measurement increases from the previous measurement.
  (There is no measurement before the first measurement.) In the example above, the changes are as follows:

  199 (N/A)
  200 (increased)
  208 (increased)
  210 (increased)
  200 (decreased)
  207 (increased)
  240 (increased)
  269 (increased)
  260 (decreased)
  263 (increased)

  In this example, there are 7 measurements that are larger than the previous measurement.

  SO, how many measurements are larger than the previous statement?

  Part 2:

  Considering every single measurement isn't as useful as you expected -- there's just too
  much noise in the data.

  Instead, consider sums of a three-measurement sliding window. Again considering the abobe example:

  199  A
  200  A B
  208  A B C
  210    B C D
  200  E   C D
  207  E F   D
  240  E F G
  269    F G H
  260      G H
  263        H


  Start by comparing the first and second three-measurement windows. The measurements in the first
  window are marked A (199, 200, 208); their sum is 199 + 200 + 208 = 607. The seconds window is marked
  B (200, 208, 210); its sum is 618. The sum of measurements in the second windows is larger than the 
  sum of the first, to this first comparison is increased!

  Your goal is to count the number of times the sum of measurements in this sliding window increases
  from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop
  when there aren't enough measurements left to create a new three-measurement sum.

  In the above example, the sum of each three-measurement window is as follows:

  A: 607 (N/A)
  B: 618 (increased)
  C: 618 (no change)
  D: 617 (decreased)
  E: 647 (increased)
  F: 716 (increased)
  G: 769 (increased)
  H: 792 (increased)

  In this example, there are 5 sums that are larger than the previous sum.

  Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?

*/

const fs = require("fs");

const data = fs.readFileSync("input.txt", { encoding: "utf-8" } ).split("\n");
let count = 0;


function partOne() {
    data.forEach((item, index) => {
	if(index > 0) {
	    if(parseInt(item) > parseInt(data[index - 1]))
		count++;
	}
    });
    console.log(`There were ${count} measurements larger than the previous statement`);
}

function partTwo() {
    let count = 0;
    data.forEach((item, index) => {
	if(index > 0 && (data.length - index) > 3) {
	    const A = {
		prev: parseInt(data[index - 1]),
		curr: parseInt(item),
		next: parseInt(data[index + 1])
	    };

	    const B = {
		prev: parseInt(item),
		curr: parseInt(data[index + 1]),
		next: parseInt(data[index + 2])
	    };

	    const aSum = A.prev + A.curr + A.next;
	    const bSum = B.prev + B.curr + B.next;

	    if(aSum < bSum) {
		console.log(`Sum were larger than prev: ${aSum} < ${bSum}`);
		count++;
	    }
	    else if(aSum == bSum) {
		console.log(`No change ${aSum} == ${bSum}`);
	    }
	    else {
		console.log(`Sum were smaller than prev: ${aSum} > ${bSum}`);
	    }
	}
    });

    console.log(`Total count: ${count}`);
}
