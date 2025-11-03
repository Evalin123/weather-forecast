import React from 'react';

const SnowAnimation = () => {
    const bigFlakes = Array.from({ length: 10 }, (_, index) => ({
        id: `big-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.6 + Math.random() * 1}s`,
    }));

    const mediumFlakes = Array.from({ length: 10 }, (_, index) => ({
        id: `medium-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.8 + Math.random() * 1}s`,
    }));

    const smallFlakes = Array.from({ length: 10 }, (_, index) => ({
        id: `small-${index}`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random() * 1}s`,
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg">
            {bigFlakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake-big animate-raindrop"
                    style={{
                        left: flake.left,
                        animationDelay: flake.animationDelay,
                        animationDuration: flake.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
            {mediumFlakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake-medium animate-raindrop"
                    style={{
                        left: flake.left,
                        animationDelay: flake.animationDelay,
                        animationDuration: flake.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
            {smallFlakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake-small animate-raindrop"
                    style={{
                        left: flake.left,
                        animationDelay: flake.animationDelay,
                        animationDuration: flake.animationDuration,
                        animationFillMode: 'both',
                    }}
                />
            ))}
        </div>
    );
};

export default SnowAnimation;
