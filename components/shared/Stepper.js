import React from 'react'

function Stepper(props) {
    const { currentStep, setCurrentStep, stepBarWidth } = props;
    return (
        <>
            <div className="stepper-circles">
                <div className={`stepper-circle ${currentStep === 0 && 'active'}`} onClick={() => setCurrentStep(0)}>
                    <span style={{ position: 'absolute' }}>1</span>
                    <span className='stepper-info'>Step 1</span>
                </div>
                <div className={`stepper-circle ${currentStep === 1 && 'active'}`} onClick={() => setCurrentStep(1)}>
                    <span style={{ position: 'absolute' }}>2</span>
                    <span className='stepper-info'>Step 2</span>
                </div>
                <div className={`stepper-circle ${currentStep === 2 && 'active'}`} onClick={() => setCurrentStep(2)}>
                    <span style={{ position: 'absolute' }}>3</span>
                    <span className='stepper-info'>Step 3</span>
                </div>
            </div>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: stepBarWidth }}></div>
            </div>
        </>
    )
}

export default Stepper