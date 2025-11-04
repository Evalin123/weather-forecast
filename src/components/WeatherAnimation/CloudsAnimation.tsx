import React from 'react';

const CloudsAnimation = () => {
    const clouds = [
        { id: 1, size: 'large', delay: 0, duration: 25, top: '15%' },
        { id: 2, size: 'medium', delay: 3, duration: 30, top: '35%' },
        { id: 3, size: 'small', delay: 6, duration: 20, top: '55%' },
        { id: 4, size: 'large', delay: 9, duration: 28, top: '25%' },
        { id: 5, size: 'medium', delay: 12, duration: 32, top: '45%' },
        { id: 6, size: 'small', delay: 15, duration: 22, top: '10%' },
    ];

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg bg-gray-300">
            {clouds.map(cloud => (
                <div
                    key={cloud.id}
                    className={`cloud cloud-${cloud.size}`}
                    style={{
                        top: cloud.top,
                        animationDelay: `${cloud.delay}s`,
                        animationDuration: `${cloud.duration}s`,
                    }}
                >
                    <div className="cloud-part cloud-part-1"></div>
                    <div className="cloud-part cloud-part-2"></div>
                    <div className="cloud-part cloud-part-3"></div>
                    <div className="cloud-part cloud-part-4"></div>
                    <div className="cloud-part cloud-part-5"></div>
                </div>
            ))}
        </div>
    );
};

export default CloudsAnimation;
