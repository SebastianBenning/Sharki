class StatusBar extends DrawableObject{


    

    percentage = 100;

    constructor(type, x, y, width, height, percentage){
        super();
        this.loadImages(STATUS_BAR_IMAGES[type]);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setPercentage(percentage, type);
    }


    setPercentage(percentage, type){
        this.percentage = percentage;
        let path = STATUS_BAR_IMAGES[type][this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
        resolveImageIndex(){   
        if(this.percentage >= 100){
            return 5;
        } else if (this.percentage > 80){
            return 4;
        } else if (this.percentage > 60){
            return 3;
        } else if (this.percentage > 40){
            return 2;
        } else if (this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
        }
    

}