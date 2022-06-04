# Nuages !
## Description :
This is a doodle jump ripoff.
We, players, are a small living thing bouncing relentlessly on platforms and of which we control the lateral movements, each successful jump takes us to new heights. If we fall from the screen which cannot go down the game is lost.

## Data to handle:
- time
- horizontal directional arrows
- player (pos, dir, speed)
- platforms (pos, dir, speed)
- screen dimensions
- score (basically height)
- high_score (cookie)

## Functions :
- void	init();
- int	fetch_cookie();
- void	game();
- void	display();
- void	move_player(time, input);
- void	move_platforms(time);
- void	update_platforms();
- void	death();
- void	set_cookie();

## Logic :
```
	score = 0;
	time = curtime;
	high_score = fetch_cookie();
	init():
		player
		platforms
		game(time)
	
	game(time):
		move_player(time, input)
		update_platforms(time)
		move_platforms(time)
		display()
		if (death()):
			set_cookie()
			init()
			return()
		game(time)
```