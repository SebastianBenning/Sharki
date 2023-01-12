class Bubble extends MovableObject{
    attack = 10;
    height = 50;
    width = 50;
    offset = {
        top: 12,
        bottom: 12,
        left: 12,
        right: 12
    }
    constructor(x, y, otherDirection){
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 50;
        this.width = 50;
        this.trow();
    }

    trow(){
        if(this.otherDirection){
            setInterval(() =>{
                this.x -= 3
            }, 1000/ 60);
        }else{
            setInterval(() =>{
                this.x += 3
            }, 1000/ 60);
        }
        
        
    }

}