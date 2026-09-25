import { useEffect, useState } from 'react'
import './App.css'

function useBodyDimension() {
  const [bodyWidth, setBodyWidth] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => {
    const body = document.body;

    const update = () => {
      setBodyWidth(body.getBoundingClientRect().width);
      setBodyHeight(body.getBoundingClientRect().height);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(body);

    return () => observer.disconnect();
  }, []);

  return { bodyWidth, bodyHeight };
}

function Star({ bodyWidth, bodyHeight }: { bodyWidth: number, bodyHeight: number }) {
  const randomX = Math.floor(Math.random() * bodyWidth);
  const randomY = Math.floor(Math.random() * bodyHeight);

  const pulseDuration = 4 + Math.random() * 8;

  return (
    <div className='star' style={{
      position: "absolute",
      left: `${randomX}px`,
      top: `${randomY}px`,
      animation: `pulse ${pulseDuration}s infinite`
    }}>

    </div >
  )
}


function Starfield() {
  // Pixel density: 1 star per 5000 pixels
  const pixelDensity = 5000;

  const { bodyWidth, bodyHeight } = useBodyDimension();

  const totalPixels = bodyWidth * bodyHeight;

  const numberOfStars = Math.floor(totalPixels / pixelDensity);

  let stars = [];

  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<Star key={i} bodyWidth={bodyWidth} bodyHeight={bodyHeight} />);
  }

  return (
    <>
      {stars}
    </>
  );
}


function App() {


  return (
    <div>
      <Starfield />
    </div>
  );
}

export default App
