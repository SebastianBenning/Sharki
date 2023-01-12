class Fish extends MovableObject{
    height= 50;
    width= 50;
    hitsuper = false;

    images_walking=[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
        
    ];

    offset = {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0
    }

    constructor(x, y, start, end, direction, speed){

        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = x;
        this.y = y;
        
        this.animate(start, end, direction, speed);
      
        
    }


    animate(start, end, direction, speed){
        this.switschMove(start, end, direction, speed);
        
        
        setInterval(() =>{
            this.loadImages(this.images_walking);
            let i = this.currentImage % this.images_walking.length;
            this.playAnimation(this.images_walking, i);
        }, 130);
    }


    upDownLoop(){       
                this.moveLeft();
           
    }
}
