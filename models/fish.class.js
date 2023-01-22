class Fish extends MovableObject {
    height = 50;
    width = 50;
    hitsuper = false;
    offset = {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0
    }

    constructor(x, y, start, end, direction, speed) {

        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(ENEMYS['fish_walking']);
        this.x = x;
        this.y = y;
        this.animate(start, end, direction, speed);
    }

    animate(start, end, direction, speed) {
        this.switschMove(start, end, direction, speed);

        setInterval(() => {
            this.playAnimation(ENEMYS['fish_walking'], 1);
        }, 130);
    }

}
