class Endboss extends MovableObject {
    energy = 50;
    height = 400;
    width = 400;
    y = 0;
    hadfirstContact = false;
    images_walking = [
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

    constructor() {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.x = 2300;
        this.animate();
    }

    animate() {
        let bossanimation = 0;
        setInterval(() => {
            if (bossanimation < 10) {
                this.loadImages(ENEMYS['boss_animation']);
                let i = this.currentImage % ENEMYS['boss_animation'].length;
                this.playAnimation(ENEMYS['boss_animation'], i);
                bossanimation++;
            }
            else if (this.isHurt()) {
                this.loadImages(ENEMYS['boss_swim']);
                let i = this.currentImage % ENEMYS['boss_swim'].length;
                this.playAnimation(ENEMYS['boss_swim'], i);
            }
            else {
                this.loadImages(ENEMYS['boss_swim']);
                let i = this.currentImage % ENEMYS['boss_swim'].length;
                this.playAnimation(ENEMYS['boss_swim'], i);
            }

            if (this.istriggerd && !this.hadfirstContact) {
                bossanimation = 0;
                this.hadfirstContact = true;
            }
        }, 130);
    }

    
}