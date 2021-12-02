import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import VInput from "components/form/VInput";
import { get, keys } from "lodash";
import React, { useRef, useState } from "react";
import { ValidationName } from "helper/useValidator";
import ContainedButton from "components/button/ContainedButton";

const AddForm: React.FC = () => {
  const classes = useStyles();
  const nameRef = useRef(null);
  const [formValue, setFormValue] = useState({
    name: {
      value: "",
      onBlur: false,
      ruleNames: [ValidationName.Required],
    },
    slug: {
      value: "",
      onBlur: false,
      ruleNames: [ValidationName.Required],
    },
  });

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue({
        ...formValue,
        [key]: {
          ...get(formValue, key),
          value: event.target.value,
        },
      });
    };

  const handleBlur =
    (key: string) =>
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValue({
        ...formValue,
        [key]: {
          ...get(formValue, key),
          onBlur: true,
        },
      });
      console.log("hi");
    };

  const handleSubmit = () => {
    // @ts-ignore: Object is possibly 'null'.
    nameRef.current.blur();

    console.log("submit", nameRef.current);
    const onBlurValues = keys(formValue).map((x) => {
      return get(formValue, `${x}.onBlur`) || false;
    });
    if (onBlurValues.filter((x) => !!x).length) {
      console.log("hi");
    }
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Typography className="bolder">Add new attribute</Typography>
        <br />
        <Typography>Name</Typography>
        {/* <RootRef rootRef={nameRef}> */}
        <VInput
          value={formValue.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          margin="dense"
          inputRef={nameRef}
        />
        {/* </RootRef> */}
        <br />
        <Typography>Slug</Typography>
        <VInput
          value={formValue.slug}
          onChange={handleChange("slug")}
          onBlur={handleBlur("slug")}
          margin="dense"
        />
        <br />
        <ContainedButton
          text="Add attribute"
          props={{
            style: {
              width: "fit-content",
            },
            onClick: () => handleSubmit(),
          }}
        />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiFormControl-root": {
        width: "100%",
      },
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default AddForm;
