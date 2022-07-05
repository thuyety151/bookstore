import {
  createStyles,
  Divider,
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
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Media } from "model/media";
import { RootStore } from "redux/store";
import clsx from "clsx";
import { Author } from "model/author";
import { upsertAuthor } from "redux/actions/author/postAction";
import ImageUploadContainer from "components/imageUpload/ImageUploadContainer";

export type AddFormProps = {
  model?: Author | null;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitForm = (): Author => ({
    id: props.model?.id || null,
    name: props.model?.name || "",
    medias: props.model?.medias || ([] as Media[]),
    description: props.model?.description || "",
  });
  const [filesState, setFilesState] = useState<File[] & Media[]>(
    (props.model?.medias || []) as File[] & Media[]
  );
  const [formValue, setFormValue] = useState<Author>(getInitForm());
  const dispatch = useDispatch();
  const { resquesting } = useSelector((state: RootStore) => state.media);
  const { enqueueSnackbar } = useSnackbar();
  const loading = useSelector(
    (state: RootStore) => state.categories.requesting
  );

  const handleChange = (key: string) => (event: any) => {
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
    const x = ["name"].map((key: string) => {
      return !!get(formValue, key); // false is invalid
    });

    if (x.includes(false)) {
      return;
    }

    /**
     *  integrate api
     */
    dispatch(
      upsertAuthor({
        data: formValue,
        onSuccess: () => {
          setIsSubmit(false);
          enqueueSnackbar(
            formValue.id
              ? "Update author successfully"
              : "Create new author successfully!",
            {
              variant: "success",
            }
          );
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };

  const handleImageChange = (media: any) => {
    setFormValue({
      ...formValue,
      medias: media,
    });
    setFilesState(media);
  };
  return (
    <div className={clsx(classes.root)}>
      <Paper variant="outlined" className={clsx("pa-xl", "border-radius-12")}>
        <Grid>
          {!props.model && (
            <div className="card-header">
              <Typography className="bolder">Add new author</Typography>
              <Divider />
            </div>
          )}
          <br />
          <Typography>Name</Typography>
          <VInput
            value={formValue.name}
            onChange={handleChange("name")}
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
          <Typography>Description</Typography>
          <VInput
            value={formValue.description}
            onChange={handleChange("description")}
            margin="dense"
            inputRef={(input) => {
              if (input != null && isSubmit) {
                input.focus();
                input.blur();
              }
            }}
            rules={[ValidationName.Required]}
            multiline
          />
          <br />
          <Typography>Image</Typography>
          <ImageUploadContainer
            files={filesState}
            setFiles={(val) => handleImageChange(val)}
            onRemoveFile={(file) => handleImageChange([])}
          />
          <br />
          <ContainedButton
            text={props.model ? "Save" : "Add author"}
            style={{
              width: "fit-content",
            }}
            disabled={resquesting || loading}
            onClick={() => handleSubmit()}
            loading={loading}
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
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default AddForm;
