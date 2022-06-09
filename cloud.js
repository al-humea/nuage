"use strict";
let cnv;
let ctx;
let saveTime;
let deltaTime;
let clouds;
let player

class Cloud {
	constructor(w, x, y, s){
		this.width = w;
		this.pos = [x, y];
		this.speed = s;
	}
	move(deltaTime){
		this.pos[0] += this.speed;
		console.log(this.pos);
	}
}

function init(){
	player = {
		x: 400.0,
		y: 650.0,
		v: 0.0,
		s: 1.0
	};
	cnv = document.getElementById("canvas");
	ctx = cnv.getContext("2d");
	window.requestAnimationFrame(game);
	clouds = [];
	clouds.push(new Cloud(100, 350, 700, 1));
	clouds.push(new Cloud(100, 550, 550, 1));
	game();
}
function draw (){
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	clouds.forEach((cloud) => {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(cloud.pos[0], cloud.pos[1], cloud.width, 10);
	});
	ctx.beginPath();
	ctx.fillStyle = "yellow";
	context.arc(player.x, player.y, 25, 0, 2 * Math.PI, false);
	ctx.fill();
}
function update(deltaTime){
	clouds.forEach(cloud =>{
		cloud.move(deltaTime);
	})
}
function game(time){
	deltaTime = (time - saveTime) / 1000;
	saveTime = time;
	deltaTime = Number(Math.min(deltaTime, 0.1).toFixed(4));
	update(deltaTime);
	draw();
	window.requestAnimationFrame(game);
}