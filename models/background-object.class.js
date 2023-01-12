class BackgroundObject extends MovableObject{
    
    constructor(imagePath, x, y, width, height){
        super().loadImage(imagePath);
        this.height = height;
        this.width= width;
        this.y = y;
        this.x = x;
    }
}