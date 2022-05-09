import {
  CircularProgress,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import ContainedButton from "components/button/ContainedButton";
import InputSelect from "components/form/InputSelect";
import VInput from "components/form/VInput";
import HeaderPage from "components/headerPage/HeaderPage";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttributes } from "redux/actions/attribute/getAction";
import { getAll } from "redux/actions/settings/getActions";
import { updateSettings } from "redux/actions/settings/postActions";
import { Setting } from "redux/reducers/settingsReducer";
import { RootStore } from "redux/store";

export const listTitle = [
  "Best Selling",
  "Deals Of Week",
  "Biography Book",
  "Most View",
  "On Sale",
  "New Release",
  "Top Category",
  "Highlight",
  "Best Of Week",
  "Top Author",
];

const SettingsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settiingsState = useSelector((state: RootStore) => state.settings);
  const attributesSelectMenu = useSelector(
    (state: RootStore) => state.attributes.data
  );
  const { enqueueSnackbar } = useSnackbar();

  const [formValue, setFormValue] = useState([] as Setting[]);
  useEffect(() => {
    dispatch(getAll());
    dispatch(
      getAttributes({
        onSuccess: (attribute: any) => {},
        onFailure: () => {},
      })
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFormValue(settiingsState.data || []);
  }, [settiingsState]);

  const handleSubmit = () => {
    if (
      formValue.flatMap((x) => x.metaData?.length).filter((x) => x === 0).length
    ) {
      return;
    }
    dispatch(
      updateSettings({
        data: formValue,
        onSuccess: () => {
          enqueueSnackbar("Update successfully", { variant: "success" });
        },
        onFailure: () => {
          enqueueSnackbar("Update fail", { variant: "error" });
        },
      })
    );
  };
  const handleChange = (item: Setting, keyValueChange: string, value: any) => {
    setFormValue([
      ...formValue.map((x) =>
        x.id === item.id
          ? {
              ...item,
              [keyValueChange]:
                keyValueChange === "quantity"
                  ? Number(value)
                  : (value as []) || null,
            }
          : x
      ),
    ]);
  };
  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Settings for Homepage" />
      <Paper className={classes.root} variant="outlined">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ padding: "16px 0px" }}
        >
          {!settiingsState.data.length && <CircularProgress />}
        </Grid>
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid item xs={5} className={classes.container}>
            {settiingsState.data?.slice(0, 5).map((item, index) => {
              return (
                <Grid item className={classes.item} key={`settings-${index}`}>
                  <Typography className={classes.title}>
                    {listTitle[index]}
                  </Typography>
                  <Grid
                    container
                    direction="column"
                    className={classes.contents}
                  >
                    <VInput
                      key={`v-input-${index}`}
                      fullWidth
                      value={formValue[index]?.quantity || 0}
                      label="Quantity"
                      onChange={(e) =>
                        handleChange(item, "quantity", e.target.value)
                      }
                    />

                    {item.defaultAttributeId && attributesSelectMenu?.length && (
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          shrink
                          id="demo-simple-select-placeholder-label-label"
                        >
                          Attribute
                        </InputLabel>
                        <Select
                          key={`select-attribute-${index}`}
                          labelId="demo-simple-select-placeholder-label-label"
                          id="demo-simple-select-outlined"
                          variant="outlined"
                          value={item.defaultAttributeId || ""}
                          error={!item.defaultAttributeId}
                          onChange={(e) => {
                            item.defaultAttributeId = e.target.value as string;
                            handleChange(
                              item,
                              "defaultAttributeId",
                              e.target.value
                            );
                          }}
                          label="Attribute"
                        >
                          {attributesSelectMenu?.map((attr, index) => (
                            <MenuItem key={index} value={attr.id}>
                              {attr.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {item.metaData && (
                      <InputSelect
                        value={item.metaData}
                        apiUrl="/categories/root"
                        onChange={(value) =>
                          handleChange(item, "metaData", value)
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={5} className={classes.container}>
            {settiingsState.data?.slice(5).map((item, index) => {
              return (
                <Grid item className={classes.item} key={`settings-${index}`}>
                  <Typography className={classes.title}>
                    {listTitle[5 + index]}
                  </Typography>
                  <Grid
                    container
                    direction="column"
                    className={classes.contents}
                  >
                    <VInput
                      key={`v-input-${5 + index}`}
                      fullWidth
                      value={formValue[5 + index]?.quantity || 0}
                      label="Quantity"
                      onChange={(e) =>
                        handleChange(item, "quantity", e.target.value)
                      }
                    />
                    {item.defaultAttributeId && attributesSelectMenu?.length && (
                      <FormControl className={classes.formControl}>
                        <InputLabel
                          shrink
                          id="demo-simple-select-placeholder-label-label"
                        >
                          Attribute
                        </InputLabel>
                        <Select
                          key={`select-attribute-${index + 5}`}
                          labelId="demo-simple-select-placeholder-label-label"
                          id="demo-simple-select-outlined"
                          variant="outlined"
                          value={item.defaultAttributeId || ""}
                          error={!item.defaultAttributeId}
                          onChange={(e) => {
                            item.defaultAttributeId = e.target.value as string;
                            handleChange(
                              item,
                              "defaultAttributeId",
                              e.target.value
                            );
                          }}
                          label="Attribute"
                        >
                          {attributesSelectMenu?.map((attr, index) => (
                            <MenuItem key={index} value={attr.id}>
                              {attr.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {item.metaData && (
                      <InputSelect
                        value={item.metaData}
                        apiUrl="/categories/root"
                        onChange={(value) =>
                          handleChange(item, "metaData", value)
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <ContainedButton
            text="Save"
            onClick={() => handleSubmit()}
            style={{ width: "100px" }}
            loading={settiingsState.requesting}
          />
        </Grid>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(2, 4),
    },
    formControl: {
      "& .MuiFormLabel-root": {
        paddingLeft: "16px",
      },
    },
    name: {
      padding: theme.spacing(2, 0),
      textAlign: "center",
    },
    container: {
      display: "grid",
    },
    title: {
      width: "30%",
    },
    item: {
      display: "flex",
      margin: theme.spacing(1, 0),
    },
    contents: {
      width: "70%",
      flexWrap: "inherit",
      "& .MuiOutlinedInput-root": {
        margin: "4px 0px",
      },
    },
  })
);

export default SettingsPage;
