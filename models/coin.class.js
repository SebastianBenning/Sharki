class Coin extends MovableObject{
    images_coin=[
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
        
    ];
    constructor(x, y){
        super().loadImage('img/4. Marcadores/1. Coins/1.png')
        this.x = x;
        this.y = y;
        this.width= 50;
        this.height=50;
        this.animate();
        
    }

    animate(){
        
        
        setInterval(() =>{
            this.loadImages(this.images_coin);
            let i = this.currentImage % this.images_coin.length;
            this.playAnimation(this.images_coin, i);
        }, 180);
    }
}