import React from 'react';

const RainAnimation = () => {
    const bigDrops = Array.from({ length: 10 }, (_, index) => ({
        id: `big-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.6 + Math.random() * 1}s`,
    }));

    const mediumDrops = Array.from({ length: 10 }, (_, index) => ({
        id: `medium-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.8 + Math.random() * 1}s`,
    }));

    const smallDrops = Array.from({ length: 10 }, (_, index) => ({
        id: `small-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random() * 1}s`,
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg bg-slate-500">
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
        </div>
    );
};

export default RainAnimation;
