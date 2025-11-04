import React from 'react';

const DrizzleAnimation = () => {
    const smallDrops = Array.from({ length: 20 }, (_, index) => ({
        id: `small-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1.2 + Math.random() * 0.8}s`,
    }));

    const tinyDrops = Array.from({ length: 20 }, (_, index) => ({
        id: `tiny-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1.5 + Math.random() * 1}s`,
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg bg-slate-400">
            {smallDrops.map(drop => (
                <div
                    key={drop.id}
                    className="drizzledrop-small animate-raindrop"
                    style={{
                        left: drop.left,
                        animationDelay: drop.animationDelay,
                        animationDuration: drop.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
            {tinyDrops.map(drop => (
                <div
                    key={drop.id}
                    className="drizzledrop-tiny animate-raindrop"
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

export default DrizzleAnimation;
