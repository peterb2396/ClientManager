const BackButton = ({ onClick, dynamic }) => (
    <img
      src={`back.png`}
      alt="Toggle Form"
    //   Dynamic Back Button will change to relative on small screens
      className= {dynamic ? "back-button-dynamic" : "back-button"}
      onClick={() => {
        onClick();
      }}
    />
  );

  export default BackButton