/*
@title: Horsemeat daves the say
@author: COMaC47

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Click the "open help" to discover your toolkit.

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "a" as inputs

Tip: 
Do you find it annoying restarting at level 0?
Try adjusting the starting level.

--------
Level 3
--------

Edit the map.

--------
Level 4
--------

Make boxes push boxes.

--------
Level 5
--------

Add sound effects when you move.

--------
Level 6
--------

Solve the puzzle!

--------
END
--------

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
.....00000......
....0222220.....
...023333220....
...0322233220...
...0323233320...
...0322233320...
...0333333320...
...03333333320..
....0333333330..
.....030333330..
.....03000300...
....0030.0300...
...03330.03330..
....000...000...`],
  [ box, bitmap`
................
................
.....000........
....02220.......
...0233320......
..023223320.....
..0332233320....
..03333333320...
..033333333320..
...03333333330..
....0033333330..
......0033330...
........0000....
................
................
................`],
  [ goal, bitmap`
................
...00000000.....
..0222222220....
.022777777220...
.027757557720...
.0275575577220..
.0277575755720..
.0275777555720..
.0275577777720..
.0277577555720..
.0227755755720..
..027755577720..
..022777777220..
...0222222220...
....00000000....
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

let level = 0;
const levels = [
  map`
wpwg....wwww
wbwwww......
w..w...www..
......ww....
.wwww.ww.w.w
.........w.w
..wwww.w.w..
w...........
wwwwwwwwww..`,
  map`
wwwwwwwwwwwwwwwww
w...wwwwwwwwwwwww
w.......b......ww
ww.ww.w.p.w.ww.ww
ww.w..w...w..w.ww
ww.w.www.www.w.ww
ww.w.w.......w.ww
ww.w.w.w.w.w.w..w
ww.w.w.wgw.w....w
ww.w.w.www.w.w.ww
ww.w.w.....w.w.ww
ww.w.www.w.w.w.ww
ww.w...w.......ww
w..www.w..www...w
w......wwww.....w
w..ww........w..w
wwwwwwwwwww..wwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w....ww.....................................w.bgw
w.wwww..ww.www.www.wwwwwwwwwwwwwwwwwwwwwwwwww.w.w
w.w....ww...w......w....w......w....www.......www
www.ww.w..w.ww.www.wwww.wwww.w...w.ww...w.www...w
w......w.wwwww..w........w...wwwww.ww.w...w.w.www
w.w.ww...w.ww......wwwwwwwww..........wwwww...w.w
www.www.ww....ww.w.w.w....w..w.wwwwww.w..wwwwww.w
w...w.wwwwwww..w.w...w.ww.ww.w.w.ww.w.ww........w
w.www.w...w.w....www.......www.wwwwww....www.ww.w
w.www...w.....w......wwwww.w.....ww....w......w.w
w.....w.wwwww.ww.w.w.........w.w.ww.w.ww.w.w.ww.w
w.w.www..........wwwwwwwww.www.w.ww.w..www.w....w
w.w...wwwwwww.ww.w.......w.w........wwww...wwww.w
wwwww.w.....w....w.w.www.w.w.wwww.www....w.w.w..w
w.w.w.w.w.w.www.ww.w.w.w.w......w.....ww.www.w.ww
w.w.w.w.www.w....w.w.www.www.ww.wwwww.w.........w
w.w...w...w.ww.www.w.w...w...ww.w........wwwwww.w
w.w.wwwww................w.www....w.w.w.ww....w.w
w.......wwww.wwwww.w.....w.....w.ww...w.w..wwww.w
wwww.ww......w.w.w.w.www.wwwwwww....w.w.w..wwww.w
w.........ww.www.w.w.w....w...w..wwwwww.w.....w.w
www.wwwwwww..........w.ww.w.w...ww......w.....w.w
w.w...w.....wwww.ww.........wwwww..w.ww.ww..w.w.w
w.w.w.ww.w.ww.w...wwww.wwww.w.....ww..w..w..w.w.w
w.www.w..wwww.www.w.w...w.www.w.wwwwwww..wwwwww.w
wp......ww........w...w...w...w....w............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
w.............w
w..bbb...bbb..w
w.b.....b.....w
w.b.bb..b.bb..w
w.b...b.b...b.w
w..bbb...bbb..w
w......p......w
w.............w
wwwwwwwwwwwwwww`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});
// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
