import Lottie from "lottie-react";
//import lockAnimation from './animations/Hourglass.json'
import lockAnimation from './animations/TrailLoading.json'
//import lockAnimation from './animations/MaterialWaveLoading.json'

function LoadingAnimation() {
  return (
    <>
      <div className="loading-animation" >
        <Lottie
          animationData={lockAnimation}
          loop={true}
          style={{ width: 100, height: 100 }}
        />
        <p>Cargando los datos...</p>
      </div>
    </>
  );
}
export default LoadingAnimation
