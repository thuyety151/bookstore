import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import VInput from "components/form/VInput";
import React, { useState } from "react";
import { ValidationName } from "helper/useValidator";
import ContainedButton from "components/button/ContainedButton";
import { get, keys } from "lodash";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Attribute } from "redux/reducers/attributeReducer";
import { upsertAttribute } from "redux/actions/attribute/postAction";

export type AddFormProps = {
  model?: Attribute | null;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitForm = () => ({
    id: props.model?.id || "",
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
      return !!get(formValue, key) || key === "id"; // false is invalid
    });

    if (x.includes(false)) {
      return;
    }
    /**
     *  integrate api
     */
    dispatch(
      upsertAttribute({
        data: formValue,
        onSuccess: () => {
          enqueueSnackbar(
            formValue.id
              ? "Update attribute successfully!"
              : "Create new attribute successfully!",
            {
              variant: "success",
            }
          );
          setIsSubmit(false);
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
      <Paper variant="outlined" className={classes.container}>
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
      </Paper>
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
    container: {
      padding: theme.spacing(2),
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default AddForm;
