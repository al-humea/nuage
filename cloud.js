"use strict";
let cnv;
let ctx;
let saveTime = 0;
let accTime = 0;
let deltaTime;
let platDir = 1;
let clouds = [];
let player;
let moving = false;
var keyState = {};
//score
let height = 0;
let score = 0;
let highscore = 0;
//spawner
let spawn = 150;

class Cloud {
	constructor(w, x, y, s){
		this.width = w;
		this.pos = [x, y];
		this.speed = s;
	}
	move(deltaTime){
		this.pos[0] += this.speed * deltaTime * platDir;
		if (player.pos[1] < 504)
			this.pos[1] += 504 - player.pos[1];
	}
}

function fetch_hs(){
	let cookies = document.cookie.split(";");
	let index = cookies[0].indexOf('=');
	return (Number(cookies[0].substring(index+1, cookies[0].length)));
}

function init(){
	// set up canvas
	cnv = document.getElementById("canvas");
	ctx = cnv.getContext("2d");
	// get hs
	highscore = fetch_hs();
	// player and platforms
	player = {
		color: "#ffff00",
		width: 15,
		pos: [400.0, 550.0],
		vel: [0.0, 0.0],
		grav: 500.0,
		speed: 150.0
	};
	//starting area
	clouds.push(new Cloud(100, 350, 700, 0));
	clouds.push(new Cloud(100, 500, 550, 100));
	clouds.push(new Cloud(100, 200, 550, -100));
	clouds.push(new Cloud(200, 300, 400, 0));
	clouds.push(new Cloud(100, 500, 250, 100));
	clouds.push(new Cloud(100, 200, 250, -100));
	clouds.push(new Cloud(100, 350, 100, 0));
	clouds.push(new Cloud(200, 300, -50, 0));
	//Listen to pressed keys
	window.addEventListener('keydown',function(e){
		keyState[e.keyCode || e.which] = true;
	},true);
	window.addEventListener('keyup',function(e){
		keyState[e.keyCode || e.which] = false;
	},true);
	window.requestAnimationFrame(game);
}

function death(){
	clouds = [];
	if (Number(score) > Number(highscore))
		document.cookie  = "highscore=" + score.toFixed(0) +";expires=Tue, 6 Jan 2084 03:14:07 GMT;";
	score = 0;
	player.pos = [400.0, 550.0];
	location.reload();
	return (0);
}

function draw (){
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	//scores
	ctx.fillStyle = "#00002C";
	ctx.font = "40px roboto medium";
	ctx.textAlign = "center";
	ctx.fillText("SCORE: " + score.toFixed(0), 400, 100);
	ctx.fillText("BEST : " + highscore.toFixed(0), 400, 150);
	//platforms
	clouds.forEach((cloud) => {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(cloud.pos[0], cloud.pos[1], cloud.width, 10);
	});
	//player
	ctx.beginPath();
	ctx.fillStyle = player.color;
	ctx.arc(player.pos[0], player.pos[1], player.width, 0, 2 * Math.PI);
	ctx.fill();
}

function update(deltaTime){
	clouds.forEach((cloud, i) =>{
		cloud.move(deltaTime);
		if (player.vel[1] > 0)
			if (player.pos[1] + 15 <= cloud.pos[1] + 5 && player.pos[1] + 15 >= cloud.pos[1])
				if (player.pos[0] >= cloud.pos[0] && player.pos[0] <= cloud.pos[0] + cloud.width)
					player.vel[1] = -425.0;
		if (cloud.pos[1] > 800)
			clouds.splice(i, 1);
	});
	if (player.pos[1] < 504)
		player.pos[1] += 504 - player.pos[1];
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
	player.pos[0] += player.vel[0] * deltaTime;
	player.pos[1] += player.vel[1] * deltaTime;
	player.vel[1] += player.grav * deltaTime;
	if (!moving)
		player.vel[0] = 0;
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function game(time){
	moving = false;
	deltaTime = (time - saveTime) / 1000;
	saveTime = time;
	accTime += deltaTime;
	if (score > spawn){
		let max = 1 + Math.floor(Math.random() * 3);
		spawn += 150;
		let xplats = (Math.random() * 400) / max;
		for (let i = 0; i < max; i++)
			clouds.push(new Cloud(100, 200 + (xplats + xplats * i) , -50, getRandomInt(-100, 100)));
	}
	if (player.pos[1] < 504)
		score += 504 - player.pos[1];
	update(deltaTime);
	draw();
	if (player.pos[1] > 800)
		death();
	window.requestAnimationFrame(game);
}

window.onload = init;