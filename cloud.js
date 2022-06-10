"use strict";
let cnv;
let ctx;
let saveTime = 0;
let accTime = 0;
let platDir = 1;
let deltaTime;
let clouds = [];
let player;
let moving = false;
var keyState = {};

class Cloud {
	constructor(w, x, y, s){
		this.width = w;
		this.pos = [x, y];
		this.speed = s;
	}
	move(deltaTime){
		this.pos[0] += this.speed * deltaTime * platDir;
	}
}

function init(){
	player = {
		color: "#ffff00",
		width: 15,
		pos: [400.0, 550.0],
		vel: [0.0, 0.0],
		grav: 500.0,
		speed: 150.0
	};
	clouds.push(new Cloud(100, 350, 700, 0));
	clouds.push(new Cloud(100, 550, 550, 100));
	clouds.push(new Cloud(100, 150, 550, -100));
	cnv = document.getElementById("canvas");
	ctx = cnv.getContext("2d");
	window.addEventListener('keydown',function(e){
		keyState[e.keyCode || e.which] = true;
	},true);
	window.addEventListener('keyup',function(e){
		keyState[e.keyCode || e.which] = false;
	},true);
	window.requestAnimationFrame(game);
}

function draw (){
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	clouds.forEach((cloud) => {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(cloud.pos[0], cloud.pos[1], cloud.width, 10);
	});
	ctx.beginPath();
	ctx.fillStyle = player.color;
	ctx.arc(player.pos[0], player.pos[1], player.width, 0, 2 * Math.PI);
	ctx.fill();
}

function update(deltaTime){
	clouds.forEach(cloud =>{
		cloud.move(deltaTime);
		if (player.pos[1]+15 <= cloud.pos[1] + 5 && player.pos[1]+15 >= cloud.pos[1]){
			if (player.pos[0] >= cloud.pos[0] && player.pos[0] <= cloud.pos[0] + 100)
				player.vel[1] = -425.0;
		}
	});
	player.pos[0] += player.vel[0] * deltaTime;
	player.pos[1] += player.vel[1] * deltaTime;
	player.vel[1] += player.grav * deltaTime;
	if (!moving)
		player.vel[0] = 0;
}

function game(time){
	moving = false;
	deltaTime = (time - saveTime) / 1000;
	saveTime = time;
	accTime += deltaTime;
	if (accTime >= 1){
		platDir *= -1;
		accTime = 0;
	}
	if (keyState[39]){
		player.vel[0] = player.speed;
		moving = true;
	}
	if (keyState[37]){
		player.vel[0] = -player.speed
		moving = true;
	}
	update(deltaTime);
	draw();
	window.requestAnimationFrame(game);
}

window.onload = init;