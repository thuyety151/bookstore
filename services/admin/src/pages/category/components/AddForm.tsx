import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
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
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Category } from "redux/reducers/categoryReducer";
import ProductImage from "pages/product/detail/components/ProductImage";
import { getListParent } from "redux/actions/category/getAction";
import { upsertCategory } from "redux/actions/category/postAction";
import { Media } from "model/media";
import { RootStore } from "redux/store";
import clsx from "clsx";

export type AddFormProps = {
  model?: Category | null;
};
const AddForm: React.FC<AddFormProps> = (props) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const getInitForm = (): Category => ({
    id: props.model?.id || "",
    name:
      props.model?.name[0] === "-"
        ? props.model?.name.replace("-", "")
        : props.model?.name || "",
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
  const { resquesting } = useSelector((state: RootStore) => state.media);
  const { enqueueSnackbar } = useSnackbar();
  const loading = useSelector(
    (state: RootStore) => state.categories.requesting
  );

  useEffect(() => {
    dispatch(
      getListParent((data) => {
        setOptions(data);
      })
    );
    // eslint-disable-next-line
  }, []);

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
      upsertCategory({
        data: {
          ...formValue,
          parentId: formValue.parentId ? formValue.parentId : null,
        },
        onSuccess: () => {
          setIsSubmit(false);
          enqueueSnackbar(
            formValue.id
              ? "Update category successfully"
              : "Create new category successfully!",
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
      mediaId: media[0].id,
      media: media,
    });
  };
  return (
    <div className={clsx(classes.root)}>
      <Paper variant="outlined" className={clsx("pa-xl", "border-radius-12")}>
        <Grid>
          {!props.model && (
            <div className="card-header">
              <Typography className="bolder">Add new category</Typography>
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
          <ProductImage
            media={formValue.media}
            changeImage={handleImageChange}
          />
          <br />
          <ContainedButton
            text={props.model ? "Save" : "Add category"}
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
