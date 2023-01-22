class Coin extends MovableObject{
  
    constructor(x, y){
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(STATUS_BAR_IMAGES['images_coin']);
        this.x = x;
        this.y = y;
        this.width= 50;
        this.height=50;
        this.animate();
        
    }

    animate(){       
        setInterval(() =>{     
            this.playAnimation(STATUS_BAR_IMAGES['images_coin'], 1);
        }, 180);
    }
}