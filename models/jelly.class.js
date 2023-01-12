class Jelly extends MovableObject {
    hitsuper = false;
    energy = 10;

    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
    }
    constructor(x, y, start, end, direction, speed) {

        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = x;
        this.y = y;

        this.animate(start, end, direction, speed);


    }


    animate(start, end, direction, speed) {
        this.switschMove(start, end, direction, speed);   

        setInterval(() => {
            if (this.isDead()) {
                this.loadImages(BUBBLE['jelly_BubbleTrap_Lila']);
                let i = this.currentImage % BUBBLE['jelly_BubbleTrap_Lila'].length;
                this.playAnimation(BUBBLE['jelly_BubbleTrap_Lila'], i);
            } else {
                this.loadImages(ENEMYS['jelly_Normal_Lila']);
                let i = this.currentImage % ENEMYS['jelly_Normal_Lila'].length;
                this.playAnimation(ENEMYS['jelly_Normal_Lila'], i);
            }
        }, 300);
    }






}