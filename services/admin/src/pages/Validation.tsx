import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import VInput from "components/form/VInput";
import { TextField } from "@material-ui/core";
import { ValidationName } from "helper/useValidator";

const Validation: React.FC = () => {
  const classes = useStyles();
  // const model = useRef(0);
  const [form, setForm] = useState("");
  const [submit, setSubmit] = useState(false);

  // const inputRef = useRef("");

  // useEffect(() => {
  //   console.log("model", model);
  // }, [model]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (!event.target.value) {
    //   event.target.;
    // }
    setForm(event.target.value.toString());

    // inputRef.current?.blur();
  };
  const handleClick = () => {
    // if (!event.target.value) {
    //   event.target.;
    // }
    // console.log(inputRef?.current?.value);
    setSubmit(true);
    document.getElementById("formm")?.focus();
    document.getElementById("formm")?.blur();
    // console.log(inputRef.current.);
    // inputRef?.current?.blur();
  };


  return (
    <div className={classes.root}>
      {/* <form onSubmit={handleClick}> */}
      <TextField
        // value={inputRef}
        // inputRef={inputRef}
        id="outlined-error-helper-text"
        variant="outlined"
        // value={form}
        // required
        onChange={handleChange}
        inputRef={(input) => {
          console.log("object");

          if (input != null || submit) {
            input.focus();
            // input.blur();
          }
        }}
      />
      <VInput
        className="HIHII"
        value={form}
        onChange={handleChange}
        rules={[ValidationName.Required]}
        inputRef={(input) => {
          if (input != null && submit) {
            input.focus();
            input.blur();
          }
        }}
      />
      <button onClick={handleClick}>hii</button>
      {/* </form> */}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    actions: {
      padding: theme.spacing(1),
      "& .MuiButton-root": {
        minWidth: "20px",
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default Validation;
