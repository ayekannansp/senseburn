import React, { lazy, Suspense } from "react";

const RadialGauge = lazy(() =>
    import("react-canvas-gauges").then((module) => ({
        default: module.RadialGauge,
    }))
);

const BMIGauge = ({ bmi }) => {
    const normalizedBMI = Math.min(Math.max((bmi - 10) / 30, 0), 1) * 100;

    return (
        <Suspense fallback={<div>Loading Gauge...</div>}>
            <div>
                <RadialGauge
                    value={normalizedBMI}
                    minValue={0}
                    maxValue={100}
                    width={300}
                    height={300}
                    highlights={[
                        { from: 0, to: 20, color: "rgba(255,0,0,.5)" },
                        { from: 20, to: 40, color: "rgba(255,165,0,.5)" },
                        { from: 40, to: 60, color: "rgba(0,255,0,.5)" },
                        { from: 60, to: 80, color: "rgba(255,165,0,.5)" },
                        { from: 80, to: 100, color: "rgba(255,0,0,.5)" },
                    ]}
                />
            </div>
        </Suspense>
    );
};

export default BMIGauge;
