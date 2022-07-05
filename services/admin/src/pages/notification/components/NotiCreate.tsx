import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import { EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import clsx from "clsx";
import VInput from "components/form/VInput";
import { ValidationName } from "helper/useValidator";
import UserSelect from "./UserSelect";
import ContainedButton from "components/button/ContainedButton";
import { convertToHTML } from "draft-convert";
import { useDispatch, useSelector } from "react-redux";
import { sendToUsers } from "redux/actions/noti/postActions";
import { useSnackbar } from "notistack";
import { get, keys } from "lodash";
import { getAllAdmin } from "redux/actions/noti/getActions";
import { RootStore } from "redux/store";

const NotiCreate: React.FC = () => {
  const [content, setContent] = useState(EditorState.createEmpty());
  const [formValue, setFormValue] = useState({
    title: "",
    contents: "",
    users: [],
  });
  const { enqueueSnackbar } = useSnackbar();
  const { pagination } = useSelector((state: RootStore) => state.notis);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (key: string) => (event: any) => {
    setIsSubmit(false);
    setFormValue({
      ...formValue,
      [key]: event.target.value,
    });
  };

  const handleSubmit = async () => {
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

    if (
      formValue.contents ===
      convertToHTML(EditorState.createEmpty().getCurrentContent())
    ) {
      enqueueSnackbar("Please input contents", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    await dispatch(
      sendToUsers({
        data: {
          title: formValue.title,
          contents: formValue.contents,
          userIds: formValue?.users.map((user: any) => user.id),
        },
        onSuccess: () => {
          enqueueSnackbar("Send notification successfully", {
            variant: "success",
          });
        
        },
        onFailure: (e: any) => {
          enqueueSnackbar(e.message, {
            variant: "error",
          });
        },
      })
    );
    setLoading(false);
  };

  return (
    <div>
      <Paper variant="outlined" className={clsx("pa-xl", "border-radius-12")}>
        <Grid>
          <div className="card-header">
            <Typography className="bolder">Add new notification</Typography>
            <Divider />
          </div>
          <br />
          <Typography>Tile</Typography>
          <VInput
            value={formValue.title}
            onChange={handleChange("title")}
            margin="dense"
            inputRef={(input) => {
              if (input != null && isSubmit) {
                input.focus();
                input.blur();
              }
            }}
            style={{ width: "100%" }}
            rules={[ValidationName.Required]}
          />
          <br />
          <Typography>Users</Typography>
          <Typography className="pb-sm" variant="caption">
            *If you want to send to all of users, please let's it empty
          </Typography>
          <UserSelect
            value={formValue.users}
            onChange={function (value: any): void {
              setFormValue({
                ...formValue,
                users: value,
              });
            }}
          />
          <br />
          <Typography className="pb-md">Contents</Typography>
          <Paper
            variant="outlined"
            style={{ minHeight: "20rem" }}
            className="px-lg py-md"
          >
            <Editor
              editorState={content}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(editorState: EditorState) => {
                setFormValue({
                  ...formValue,
                  contents: convertToHTML(
                    editorState.getCurrentContent()
                  ) as string,
                });
                setContent(editorState);
              }}
            />
          </Paper>
          <br />
          <ContainedButton
            text="Send"
            style={{
              width: "fit-content",
            }}
            disabled={loading}
            onClick={handleSubmit}
            loading={loading}
            className="px-xl"
          />
        </Grid>
      </Paper>
    </div>
  );
};

export default NotiCreate;
