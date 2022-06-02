"use strict";

let cnv;
let ctx;

window.onload = init;

function init(){
	cnv = document.getElementById("canvas");
	ctx = cnv.getContext("2d");
	window.requestAnimationFrame(game);
}

function draw (){
}

function game(time){
	draw();
	window.requestAnimationFrame(game);
}