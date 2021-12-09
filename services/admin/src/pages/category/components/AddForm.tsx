import {
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import VInput from "components/form/VInput";
import React, { useEffect, useState } from "react";
import { ValidationName } from "helper/useValidator";
import ContainedButton from "components/button/ContainedButton";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Category } from "redux/reducers/categoryReducer";
import ProductImage from "pages/product/detail/components/ProductImage";
import { getListParent } from "redux/actions/category/getAction";
import { createCategory } from "redux/actions/category/postAction";
import { Media } from "model/media";

export type AddFormProps = {
  model?: Category | null;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitForm = (): Category => ({
    id: props.model?.id || "",
    name: props.model?.name || "",
    slug: props.model?.slug || "",
    parentId: props.model?.parentId || "",
    mediaUrl: props.model?.mediaUrl || "",
    mediaId: props.model?.mediaId || "",
    description: props.model?.description || "",
    media: ([props.model?.media || {}] || []) as Media[],
  });
  const [formValue, setFormValue] = useState<Category>(getInitForm());
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(
      getListParent((data) => {
        setOptions(data);
      })
    );
  }, [dispatch]);

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
      createCategory({
        data: formValue,
        onSuccess: () => {
          setIsSubmit(false);
          enqueueSnackbar("Create new category successfully!", {
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

  const handleImageChange = (media: any) => {
    setFormValue({
      ...formValue,
      mediaId: media[0].id,
    });
  };
  return (
    <div className={classes.root}>
      <Grid>
        {!props.model && (
          <Typography className="bolder">Add new category</Typography>
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
        <Typography>Slug</Typography>
        <TextField
          variant="outlined"
          value={formValue.slug}
          multiline
          onChange={handleChange("slug")}
          margin="dense"
        />
        <br />
        <Typography>Parent category</Typography>
        <Select
          variant="outlined"
          value={formValue.parentId}
          fullWidth
          onChange={handleChange("parentId")}
          margin="dense"
        >
          {options.map((item: any, index: number) => {
            return (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        <br />
        <Typography>Description</Typography>
        <TextField
          variant="outlined"
          value={formValue.description}
          multiline
          onChange={handleChange("description")}
          margin="dense"
        />
        <br />
        <Typography>Image</Typography>
        <ProductImage media={formValue.media} changeImage={handleImageChange} />
        <br />
        <ContainedButton
          text={props.model ? "Save" : "Add category"}
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
