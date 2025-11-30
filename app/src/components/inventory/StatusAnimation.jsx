import Lottie from "lottie-react";
import redDot from './animations/red_dot.json'
import orangeDot from './animations/orange_dot.json'
import greenDot from './animations/green_dot.json'

function LoadingAnimation({ color }) {

  return (
    <>
      <span className="dot-status-animation" >
        {color === "red" ? (
          <Lottie
            animationData={redDot}
            loop={true}
            style={{ width: 40, height: 40 }}
          />
        ) : color === "orange" ? (
          <Lottie
            animationData={orangeDot}
            loop={true}
            style={{ width: 40, height: 40 }}
          />
        ) : color === "green" ? (
          <Lottie
            animationData={greenDot}
            loop={true}
            style={{ width: 40, height: 40 }}
          />) : undefined
        }
      </span>
    </>
  );
}
export default LoadingAnimation
