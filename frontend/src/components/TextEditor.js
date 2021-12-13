import React from "react";
import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const TextEditor = ({ note, onSave, onDelete }) => {
  const editorTheme = createTheme();
  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: "90%",
          height: "90%",
          maxHeight: "400px",
          maxWidth: "700px",
          //border: "1px solid grey",
        },
        editor: {
          height: "300px",
          maxHeight: "630px",
          maxWidth: "650px",
          padding: "0 13px",
          marginTop: 2,
          marginBottom: 15,
          overflowX: "hidden",
          overflowY: "auto",
        },
        container: {
          display: "flex",
          flexDirection: "column",
          margin: 0,
          boxShadow: "3px 3px 10px gray",
          borderRadius: 10,
        },
        // toolbar: {
        //   display: "block",
        //   order: 2,
        //   position: "relative",
        // },
        placeHolder: {
          position: "relative",
        },
        editorContainer: {
          padding: 10,
          margin: 0,
          fontSize: 15,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={editorTheme}>
      <MUIRichTextEditor
        data-testid="text-editor"
        defaultValue={note && note.toString()}
        label="Nuova nota..."
        onSave={onSave}
        controls={["bold", "italic", "bulletList", "save", "delete"]}
        customControls={[
          {
            name: "delete",
            icon: <DeleteIcon data-testid="remove-icon" />,
            type: "callback",
            onClick: () => onDelete(),
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default TextEditor;
