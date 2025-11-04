import React from 'react';

const ClearAnimation = () => {
    // 太阳位置（顶部中间偏右，略被遮住）
    const sunPosition = { top: '-39%', left: '58%' };

    // 生成多条阳光光线，从太阳位置发散
    // 角度说明：90° = 正右，180° = 正下，270° = 正左
    const sunrays = Array.from({ length: 9 }, (_, index) => ({
        id: `sunray-${index}`,
        delay: index * 0.25,
        angle: -40 + index * 10, // 从 45°(右上) 到 265°(左上)，覆盖下半圆
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg">
            {/* 太阳 - 只露出 1/2 到 1/4，位于中间偏右 */}
            <div className="sun" style={sunPosition}>
                {/* 太阳核心 */}
                <div className="sun-core"></div>

                {/* 太阳光晕 */}
                <div className="sun-glow"></div>
            </div>

            {/* 阳光从太阳发散出来的效果 */}
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
