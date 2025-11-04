import React from 'react';

const ThunderstormAnimation = () => {
    const bigDrops = Array.from({ length: 15 }, (_, index) => ({
        id: `big-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.4 + Math.random() * 1}s`,
    }));

    const mediumDrops = Array.from({ length: 15 }, (_, index) => ({
        id: `medium-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.6 + Math.random() * 1}s`,
    }));

    const smallDrops = Array.from({ length: 15 }, (_, index) => ({
        id: `small-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.8 + Math.random() * 1}s`,
    }));

    const lightnings = Array.from({ length: 5 }, (_, index) => ({
        id: `lightning-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3 + 1}s`,
        rotation: `${-5 + Math.random() * 10}deg`,
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg bg-slate-600">
            {bigDrops.map(drop => (
                <div
                    key={drop.id}
                    className="raindrop-big animate-raindrop"
                    style={{
                        left: drop.left,
                        animationDelay: drop.animationDelay,
                        animationDuration: drop.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
            {mediumDrops.map(drop => (
                <div
                    key={drop.id}
                    className="raindrop-medium animate-raindrop"
                    style={{
                        left: drop.left,
                        animationDelay: drop.animationDelay,
                        animationDuration: drop.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
            {smallDrops.map(drop => (
                <div
                    key={drop.id}
                    className="raindrop-small animate-raindrop"
                    style={{
                        left: drop.left,
                        animationDelay: drop.animationDelay,
                        animationDuration: drop.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
            {lightnings.map(lightning => (
                <div
                    key={lightning.id}
                    className="lightning animate-lightning"
                    style={{
                        left: lightning.left,
                        animationDelay: lightning.animationDelay,
                        transform: `rotate(${lightning.rotation})`,
                    }}
                />
            ))}
        </div>
    );
};

export default ThunderstormAnimation;
