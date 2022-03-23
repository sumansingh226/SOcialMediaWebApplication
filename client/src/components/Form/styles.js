import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: "10px 10px"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "5px 0",
    border: "1px solid white",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  textfield: {
    margin: "5px 0px",
  },
}));
