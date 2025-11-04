import React from 'react';

const AtmosphereAnimation = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg bg-gray-400">
            <div className="fog-wrapper">
                <div className="fog-layer" id="foglayer_01">
                    <div className="fog-image fog-image-01"></div>
                    <div className="fog-image fog-image-01"></div>
                </div>

                <div className="fog-layer" id="foglayer_02">
                    <div className="fog-image fog-image-02"></div>
                    <div className="fog-image fog-image-02"></div>
                </div>

                <div className="fog-layer" id="foglayer_03">
                    <div className="fog-image fog-image-02"></div>
                    <div className="fog-image fog-image-02"></div>
                </div>
            </div>
        </div>
    );
};

export default AtmosphereAnimation;
