class Chest extends MovableObject {
    intervalChest;
    closedPic;
    openpic;

    constructor(x, y) {
        super();
        this.loadImages(STATUS_BAR_IMAGES['chest']);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.animate();
        this.closePic();
        this.openPic();
    }
    
    // animates the chest
    animate() {
        this.intervalChest = [];
        this.intervalChest = setInterval(() => {
            this.playAnimation(STATUS_BAR_IMAGES['chest']);
        }, 180);
    }

    closePic() {
        this.closedPic = new Image();
        this.closedPic.src = 'img/PNG/Neutral/æhest_closed.png';
    }

    openPic() {
        this.openpic = new Image();
        this.openpic.src = 'img/PNG/Neutral/æhest_open.png';
    }
}