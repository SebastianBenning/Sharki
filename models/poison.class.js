class Poison extends MovableObject{
    offset = {
        top: 48,
        bottom: 48,
        left: 48,
        right: 48
    }


    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.animate()
    }

    animate(){
        
        
         setInterval(() =>{
            
            this.loadImages(STATUS_BAR_IMAGES['poisonatack']);
            let i = this.currentImage % STATUS_BAR_IMAGES['poisonatack'].length;
            this.playAnimation(STATUS_BAR_IMAGES['poisonatack'], i);
            
        }, 180);  
    }
}