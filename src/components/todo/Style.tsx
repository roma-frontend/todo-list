import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Poppins, sans-serif',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(to right top, #fbadd9, #f2beeb, #eacef7, #e7ddfd, #e9eaff, #e5efff, #e3f3ff, #e4f6ff, #d3f5ff, #c0f5fe, #adf4f8, #9cf3ee)",
  },

  mainTitle: {
    fontSize: "4.5rem",
    marginBottom: "2.4rem",
    color: "#D18D8D",
    WebkitTextStroke: "1px transparnet",
    WebkitBackgroundClip: "text",
    textShadow: "0px 0px 10px #AD7563"
  },

  container: {
    maxWidth: "650px",
    width: "100%",
    background: "transparent",
    backdropFilter: "blur(25px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1rem",
    boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.2)",
    padding: theme.spacing(2),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },

  listItem: {
    width: "100%"
  },
  
  list: {
    width: "100%",
    padding: "1rem",
  },

  todoTitle: {
    fontSize: "1.875rem",
  },

  addButton: {
    textTransform: "capitalize"
  }
}));

export default useStyles;