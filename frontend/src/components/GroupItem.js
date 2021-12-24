import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const GroupItem = ({
  owned,
  group,
  onDelete,
  onEdit,
  onShowMembers,
  onShowNotes,
}) => {
  return (
    <Card sx={{ minWidth: 275 }} elevation={4}>
      <CardHeader
        title={group ? group.name : <Skeleton width="70%" variant="text" />}
        subheader={
          group ? (
            group.creator.username
          ) : (
            <Skeleton width="40%" variant="text" />
          )
        }
        action={
          owned ? (
            <>
              <IconButton
                data-testid="edit-group-icon"
                onClick={() => onEdit(group)}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                data-testid="delete-group-icon"
                onClick={() =>
                  onDelete(
                    group,
                    "Elimina gruppo",
                    "Procedere con l'eliminazione del gruppo ?",
                    false
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              data-testid="exit-group-icon"
              onClick={() =>
                onDelete(
                  group,
                  "Esci dal gruppo",
                  "Procedere con l'uscita dal gruppo ?",
                  true
                )
              }
            >
              <ExitToAppIcon />
            </IconButton>
          )
        }
      />
      <CardActions>
        {group ? (
          <Button size="small" onClick={() => onShowNotes(group)}>
            Leggi note
          </Button>
        ) : (
          <Skeleton width="30%" height={15} variant="rectangle" />
        )}
        {group ? (
          <Button size="small" onClick={() => onShowMembers(group, owned)}>
            Membri
          </Button>
        ) : (
          <Skeleton width="30%" height={15} variant="rectangle" />
        )}
      </CardActions>
    </Card>
  );
};

export default GroupItem;
