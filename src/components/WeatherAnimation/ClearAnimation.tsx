import React from 'react';

const ClearAnimation = () => {
    const sunPosition = { top: '-39%', left: '58%' };

    const sunrays = Array.from({ length: 9 }, (_, index) => ({
        id: `sunray-${index}`,
        delay: index * 0.25,
        angle: -40 + index * 10,
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg">
            <div className="sun" style={sunPosition}>
                <div className="sun-core"></div>

                <div className="sun-glow"></div>
            </div>

            <div className="sunlight-container">
                {sunrays.map(ray => (
                    <div
                        key={ray.id}
                        className="sunlight-beam"
                        style={{
                            animationDelay: `${ray.delay}s`,
                            transformOrigin: 'top center',
                            transform: `rotate(${ray.angle}deg)`,
                            left: '58%',
                            top: '-35%',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ClearAnimation;
