class Endboss extends MovableObject{

    height= 400;
    width= 400;
    y = 0;
    images_walking=[
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    constructor(){
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.x = 2300;
        this.animate();
    }

    animate(){
        setInterval(() =>{
            this.loadImages(this.images_walking);
            let i = this.currentImage % this.images_walking.length;
            this.playAnimation(this.images_walking, i);
        }, 130);
    }
    
}