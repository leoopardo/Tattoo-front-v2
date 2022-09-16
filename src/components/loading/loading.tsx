import { useSpring, animated } from "react-spring";
import { LoadingDiv } from "../../styles/div.styles";

const loadingTattoMacchine = require("../../assets/img/tattooMacchine.png");

function Loading() {
  const styles = useSpring({
    loop: { reverse: true },
    from: { rotateZ: 0 },
    to: { rotateZ: 50 },
  });

  return (
    <LoadingDiv
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <animated.img
        src={loadingTattoMacchine}
        style={{
          height: "20%",
          borderRadius: 16,
          ...styles,
          filter: "invert(70%)",
        }}
      />
    </LoadingDiv>
  );
}

export default Loading;
