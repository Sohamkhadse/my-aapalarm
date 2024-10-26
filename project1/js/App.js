const { useState, useEffect } = React;

function AnimatedBackground({ children }) {
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition(prevPosition => (prevPosition + 1) % 100);
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    const style = {
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundSize: '400% 400%',
        backgroundPosition: `${position}% 50%`,
        transition: 'background-position 0.5s ease',
        minHeight: '100vh',
    };

    return <div style={style}>{children}</div>;
}

function AppIcon({ name }) {
    return (
        <div className={`icon-container ${name}`}>
            {/* SVG content here */}
        </div>
    );
}

function BouncyTitle({ text }) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000); // Reset after animation
    };

    return (
        <h1 className="bouncy-title" onClick={handleClick}>
            {text.split('').map((char, index) => (
                <span 
                    key={index} 
                    className={isAnimating ? 'bounce' : ''}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {char}
                </span>
            ))}
        </h1>
    );
}

function App() {
    return (
        <AnimatedBackground>
            <header>
                <BouncyTitle text="AapAlarm" />
            </header>
            <main>
                <div className="app-icons">
                    <AppIcon name="youtube" />
                    <AppIcon name="instagram" />
                    <AppIcon name="facebook" />
                    <AppIcon name="twitter" />
                </div>
            </main>
        </AnimatedBackground>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
