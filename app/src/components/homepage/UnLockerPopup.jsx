import Lottie from "lottie-react";
import "./UnLockerPopup.css";
import lockAnimation from './../../components/homepage/shieldproject.json'

export default function UnlockerPopup() {
  return (
    <>
      <div className="background-animation" >
        <Lottie
          animationData={lockAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    </>
  );
}
