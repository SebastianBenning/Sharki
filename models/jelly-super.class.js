class Jellysuper extends MovableObject {
    hitsuper = true;
    energy = 10;
    offset = {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
    }
    
    constructor(x, y) {
        super();
        this.loadImages(ENEMYS['jelly_Super_Green']);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ENEMYS['jelly_Super_Green'], 1);
            if (this.isDead()) {
                this.goOut();
            }
        }, 300);
    }
}