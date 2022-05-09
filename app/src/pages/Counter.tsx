import { useState } from 'react';

export const Counter = () => {
    const [counter, setCounter] = useState<number>(0)

    const incrementCounter = () => {
        setCounter(counter + 1)
    }

    return (
        <div>
            <h1>Counter</h1>
            <p aria-live="polite">Current count: <strong>{counter}</strong></p>
            <button className="btn btn-primary" onClick={incrementCounter}>Increment</button>
        </div>
    );
}
