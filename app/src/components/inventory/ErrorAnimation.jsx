import Lottie from "lottie-react";
import lockAnimation from './animations/server-error.json'

function ErrorAnimation() {
  return (
    <>
      <div className="loading-animation" >
        <Lottie
          animationData={lockAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
        <p>No se pudo conectar con el servidor. <br />Intente nuevamente más tarde.</p>
      </div>
    </>
  );
}
export default ErrorAnimation
