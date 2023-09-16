import React, { useState } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./Style";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "Create new React app", completed: true },
  { id: 2, text: "Create Todo List", completed: true },
  { id: 3, text: "Design Todo List", completed: true },
];

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editedText, setEditedText] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  const classes = useStyles();

  const handleEditClick = (task: Task) => {
    setEditTask(task);
    setEditedText(task.text);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask.id ? { ...task, text: editedText } : task
        )
      );
    }
    setOpenEditDialog(false);
  };

  const handleCancelEdit = () => {
    setEditedText("");
    setOpenEditDialog(false);
  };

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = {
        id: tasks.length + 1,
        text: newTaskText,
        completed: newTaskCompleted,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskText("");
      setNewTaskCompleted(false);
      setOpenAddDialog(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.mainTitle}>
        ToDo List
      </Typography>
      <div className={classes.container}>
        <List className={classes.listItem}>
          {tasks.map((task) => (
            <ListItem key={task.id} disableGutters>
              <Checkbox
                checked={task.completed}
                onChange={() =>
                  setTasks((prevTasks) =>
                    prevTasks.map((prevTask) =>
                      prevTask.id === task.id
                        ? { ...prevTask, completed: !task.completed }
                        : prevTask
                    )
                  )
                }
              />
              <ListItemText
                primary={
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                }
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleEditClick(task)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(task.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          startIcon={<AddIcon />}
        >
          Add new Todo
        </Button>

        <Dialog 
          open={openEditDialog} 
          onClose={handleCancelEdit}
          PaperProps={{
            style: {
              width: "100%"
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
            <Button onClick={handleCancelEdit} color="primary">
              <CancelIcon /> Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="secondary">
              <SaveIcon /> Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={openAddDialog} 
          onClose={() => setOpenAddDialog(false)}
          PaperProps={{
            style: {
              width: "100%"
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
            <Checkbox
              checked={newTaskCompleted}
              onChange={() => setNewTaskCompleted(!newTaskCompleted)}
              color="primary"
            />
          </DialogContent>
          <DialogActions style={{ padding: "1rem 2rem" }}>
            <Button onClick={() => setOpenAddDialog(false)} color="primary">
              <CancelIcon /> Cancel
            </Button>
            <Button onClick={handleAddTask} color="secondary">
              <SaveIcon /> Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default TodoList;