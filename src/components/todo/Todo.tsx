import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
} from "@material-ui/core";

import {
  addTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} from "../../store/slice/todo.slice";
import { Task } from "../../store/slice/todo.slice";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./Style";
import { RootState } from "../../store/store";


const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [newTaskCompleted, setNewTaskCompleted] = useState<boolean>(false);

  const selectTasks = useMemo(() => tasks, [tasks]);

  const handleEditClick = useCallback((task: Task) => {
    setEditTask(task);
    setEditedText(task.text);
    setOpenEditDialog(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditedText("");
    setOpenEditDialog(false);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleAddClick = useCallback(() => {
    setOpenAddDialog(true);
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = {
        id: tasks.length + 1,
        text: newTaskText,
        completed: newTaskCompleted,
      };

      dispatch(addTask(newTask));
      setNewTaskText("");
      setNewTaskCompleted(false);
      setOpenAddDialog(false);
    }
  }, [dispatch, tasks, newTaskText, newTaskCompleted]);

  const handleSaveEdit = useCallback(() => {
    if (editTask) {
      dispatch(updateTask({ id: editTask.id, text: editedText }));
    }
    setOpenEditDialog(false);
  }, [dispatch, editTask, editedText]);

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.mainTitle}>
        ToDo List
      </Typography>
      <div className={classes.container}>
        <List className={classes.listItem}>
          {selectTasks.map((task: Task) => (
            <ListItem key={task.id} disableGutters>
              <label
                htmlFor={`task-${task.id}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  style={{ margin: ".5rem" }}
                  checked={task.completed}
                  onChange={() => dispatch(toggleTaskCompletion(task.id))}
                  id={`task-${task.id}`}
                  name={`task-${task.id}`}
                />
                <ListItemText
                  primary={
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.text}
                    </span>
                  }
                />
              </label>

              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => handleEditClick(task)}
                  aria-label="edit text"
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(task.id)}
                  aria-label="delete text"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddClick}
          startIcon={<AddIcon />}
          aria-label="add button"
          className={classes.addButton}
        >
          Add new Todo
        </Button>

        <Dialog
          open={openEditDialog}
          onClose={handleCancelEdit}
          PaperProps={{
            style: {
              width: "100%",
              padding: "1rem",
            },
          }}
        >
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Text"
              fullWidth
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </DialogContent>
          <DialogActions style={{ padding: "1rem 2rem" }}>
            <Button
              onClick={handleCancelEdit}
              color="primary"
              aria-label="calcel text"
            >
              <CancelIcon /> Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              color="secondary"
              aria-label="save text"
            >
              <SaveIcon /> Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          PaperProps={{
            style: {
              width: "100%",
            },
          }}
        >
          <DialogTitle>Add new Todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Text"
              fullWidth
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <label htmlFor="checkbox">
              <Checkbox
                checked={newTaskCompleted}
                onChange={() => setNewTaskCompleted(!newTaskCompleted)}
                color="primary"
                name="checkbox"
                id="checkbox"
              />
            </label>
          </DialogContent>
          <DialogActions style={{ padding: "1rem 2rem" }}>
            <Button
              onClick={() => setOpenAddDialog(false)}
              color="primary"
              aria-label="cancel modal"
            >
              <CancelIcon /> Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              color="secondary"
              aria-label="add todo"
            >
              <SaveIcon /> Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default TodoList;
