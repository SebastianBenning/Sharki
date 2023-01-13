const level1Enemy = new levelEnemy(
    [
        new Fish(2500, 600, 2500, 1150, 'vertical', 1.5),
        new Fish(2500, 800, 2500, 1150, 'vertical', 1.3),
        new Fish(950, 50, 950, -1000, 'vertical', 1.6),
        new Fish(950, 140, 950, -1000, 'vertical', 1.0),
        new Fish(950, 220, 950, -1000, 'vertical', 1.8),
        new Fish(950, 450, 950, -1000, 'vertical', 1.9),
        new Fish(950, 650, 950, -700, 'vertical', 1.4),
        new Fish(950, 700, 950, -700, 'vertical', 1.0),
        new Fish(950, 850, 950, -700, 'vertical', 1.5),

        new Jelly(320, 440, 440, 10, 'horizontal', 0.6),
        new Jelly(-150, 10, 440, 10, 'horizontal', 0.6),
        new Jelly(1200, 800, 800, 500, 'horizontal', 0.6),
        new Jelly(1500, 500, 800, 500, 'horizontal', 0.6),
        new Jelly(1800, 800, 800, 500, 'horizontal', 0.6),
        new Jelly(2100, 500, 800, 500, 'horizontal', 0.6),
        new Jelly(-850, 800, 800, 500, 'horizontal', 0.6),

        new Jellysuper(1200, 100),
        new Jellysuper(1200, 180),
        new Jellysuper(1200, 260),
        new Jellysuper(1200, 340),
        new Jellysuper(2600, 550),
        new Jellysuper(2600, 650),
        new Jellysuper(2600, 750),
        new Jellysuper(30, 850),
        new Jellysuper(200, 850),

        new Endboss()
    ]
);