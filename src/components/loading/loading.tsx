import { useSpring, animated } from "react-spring";

const loadingTattoMacchine = require("../../assets/img/tattooMacchine.png");

function Loading() {
  const styles = useSpring({
    loop: { reverse: true },
    from: { rotateZ: 0 },
    to: { rotateZ: 50 },
  });

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        filter: "opacity(60%) hue-rotate(90deg)",
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
          filter: "invert(100%)",
        }}
      />
      <h2 style={{ color: "white", marginTop: "4%" }}>Loading...</h2>
    </div>
  );
}

export default Loading;
