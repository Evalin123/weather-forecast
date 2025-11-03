import React from 'react';

const AtmosphereAnimation = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg">
            <div className="fog-wrapper">
                {/* 第一层雾 - 较快移动，使用 fog1 图片 */}
                <div className="fog-layer" id="foglayer_01">
                    <div className="fog-image fog-image-01"></div>
                    <div className="fog-image fog-image-01"></div>
                </div>

                {/* 第二层雾 - 中速移动，使用 fog2 图片 */}
                <div className="fog-layer" id="foglayer_02">
                    <div className="fog-image fog-image-02"></div>
                    <div className="fog-image fog-image-02"></div>
                </div>

                {/* 第三层雾 - 较慢移动，使用 fog2 图片 */}
                <div className="fog-layer" id="foglayer_03">
                    <div className="fog-image fog-image-02"></div>
                    <div className="fog-image fog-image-02"></div>
                </div>
            </div>
        </div>
    );
};

export default AtmosphereAnimation;
