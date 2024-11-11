import FieldInput from "../app/FieldInput";

const WifiForm = () => {
  return (
    <>
      <FieldInput
        changeTitle={(value) => console.log(value)}
        value="title value"
        label="Nazev zařízení"
        type="text"
      />
      <FieldInput
        changeTitle={(value) => console.log(value)}
        value="heslo value"
        label="Heslo wifi"
        type="password"
      />
    </>
  );
};

export default WifiForm;
