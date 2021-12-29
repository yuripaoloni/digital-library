import React from "react";
import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SendIcon from "@mui/icons-material/Send";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";

const TextEditor = ({
  note,
  onSave,
  onDelete,
  onSelectNotes,
  onShare,
  onUnshare,
  shared,
  removable,
}) => {
  const editorTheme = createTheme();
  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          maxHeight: "800px",
          maxWidth: "700px",
          //border: "1px solid grey",
          marginBottom: 15,
          marginTop: 10,
        },
        editor: {
          height: 380,
          maxHeight: "800px",
          maxWidth: "700px",
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

  let controls = [
    "bold",
    "italic",
    "bulletList",
    "save",
    "selectNotes",
    "share",
  ];

  return (
    <ThemeProvider theme={editorTheme}>
      <MUIRichTextEditor
        data-testid="text-editor"
        defaultValue={note && note.toString()}
        label="Nuova nota..."
        onSave={onSave}
        //TODO if owner of a note, the user can delete it. Otherwise not
        controls={removable ? [...controls, "delete"] : [...controls]}
        customControls={[
          {
            name: "delete",
            icon: <DeleteIcon data-testid="remove-icon" />,
            type: "callback",
            onClick: () => onDelete(),
          },
          {
            name: "selectNotes",
            icon: <LibraryBooksIcon data-testid="select-note" />,
            type: "callback",
            onClick: () => onSelectNotes(),
          },
          {
            name: "share",
            icon: shared ? (
              <CancelScheduleSendIcon data-testid="unshare-note" />
            ) : (
              <SendIcon data-testid="share-note" />
            ),
            type: "callback",
            onClick: () => (shared ? onUnshare() : onShare()),
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default TextEditor;
