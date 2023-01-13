class BackgroundWater extends MovableObject {
    width = 1440;
    height = 960;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
    }
}