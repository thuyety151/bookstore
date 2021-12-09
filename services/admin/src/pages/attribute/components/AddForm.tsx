import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import VInput from "components/form/VInput";
import React, { useState } from "react";
import { ValidationName } from "helper/useValidator";
import ContainedButton from "components/button/ContainedButton";
import { get, keys, omit } from "lodash";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { createAttribute } from "redux/actions/attribute/postAction";
import { Attribute } from "redux/reducers/attributeReducer";

export type AddFormProps = {
  model?: Attribute | null;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitForm = () => ({
    id: "",
    name: props.model?.name || "",
    slug: props.model?.slug || "",
  });
  const [formValue, setFormValue] = useState(getInitForm());
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsSubmit(false);

      setFormValue({
        ...formValue,
        [key]: event.target.value,
      });
    };

  const handleSubmit = () => {
    setIsSubmit(true);
    /**
     *  handle data again
     */
    const x = keys(formValue).map((key: string) => {
      return !!get(formValue, key); // false is invalid
    });

    if (x.includes(false)) {
      return;
    }
    /**
     *  integrate api
     */
    dispatch(
      createAttribute({
        attr: omit(formValue, "id"),
        onSuccess: () => {
          setIsSubmit(false);
          enqueueSnackbar("Create new attribute successfully!", {
            variant: "success",
          });

          setFormValue(getInitForm());
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };

  return (
    <div className={classes.root}>
      <Grid>
        {!props.model && (
          <Typography className="bolder">Add new attribute</Typography>
        )}
        <br />
        <Typography>Name</Typography>
        <VInput
          value={formValue.name}
          onChange={handleChange("name")}
          margin="dense"
          inputRef={(input) => {
            if (input != null && isSubmit) {
              console.log("hic");
              input.focus();
              input.blur();
            }
          }}
          rules={[ValidationName.Required]}
        />
        <br />
        <Typography>Slug</Typography>
        <VInput
          value={formValue.slug}
          onChange={handleChange("slug")}
          margin="dense"
          inputRef={(input) => {
            if (input != null && isSubmit) {
              input.focus();
              input.blur();
            }
          }}
          rules={[ValidationName.Required]}
        />
        <br />
        <ContainedButton
          text={props.model ? "Save" : "Add attribute"}
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
