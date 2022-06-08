"use strict";

let cnv;
let ctx;
let saveTime;
let deltaTime;
let clouds;

let player = {
	x: 400.0,
	y: 650.0,
	v: 0.0,
	s: 1.0
};

let cloud = (size, x, y, s, time)=>{
	this.width = size;
	this.pos = [x, y];
	this.speed = s * time;
	while (this.speed != 0)
		this.pos[0] += this.speed;
	return (this);
};

window.onload = init; // Calls init once the page is loaded

function init(){
	cnv = document.getElementById("canvas");
	ctx = cnv.getContext("2d");
	window.requestAnimationFrame(game);
	clouds = new Array();
	clouds.push(cloud(100, 350, 700, 0, 0));
	clouds.push(cloud(100, 550, 550, 0, 0));
	game();
}
function draw (){
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	clouds.forEach((cloud) => {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(cloud.pos[0], cloud.pos[1], cloud.width, 10);
	});
	ctx.beginPath();
	ctx.fillStyle = "#FFFF00";
	ctx.arc(player.x, player.y, 25, 0, 2 * Math.PI);
	ctx.fill();
}
function update(deltaTime){
	clouds.forEach(cloud =>{
		cloud.time = deltaTime;
	})
	player.y -= deltaTime;
}
function game(time){
	deltaTime = (time - saveTime) / 1000;
	saveTime = time;
	deltaTime = Math.min(deltaTime, 0.1).toFixed(4);
	update(deltaTime);
	draw();
	window.requestAnimationFrame(game);
}