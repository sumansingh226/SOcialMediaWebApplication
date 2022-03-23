import React, { useEffect, useState } from "react";
import useStyle from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/actions/posts";
import CloseIcon from '@mui/icons-material/Close';

const Form = ({ CurrentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const [showForm,setshowForm] = useState(true)
  const classes = useStyle();
  const posts = useSelector((state) =>
    CurrentId ? state.posts.find((post) => post._id === CurrentId) : null
  );

  useEffect(() => {
    if (posts) {
      setPostData(posts);
    }
  }, [posts]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (CurrentId) {
      dispatch(updatePost(CurrentId, postData));
      clear();
      setshowForm(false)
    } else {
      dispatch(createPost(postData));
      clear();
      setshowForm(false)
    }
  };

  return (
   <>{showForm? <Paper className={classes.paper}>
   <CloseIcon onClick={()=>setshowForm(false)} style={{textAligen:"right"}}/>
   <form
     autoComplete="off"
     noValidate
     className={`${classes.root} ${classes.form}`}
     onSubmit={handleSubmit}
   >
     <Typography variant="h6">
       {CurrentId ? `Editing ${posts.title}` : "Creating a Memory"}   
     </Typography>
     <TextField
       className={classes.textfield}
       name="creator"
       variant="outlined"
       label="Creator"
       fullWidth
       value={postData.creator}
       onChange={(e) =>
         setPostData({ ...postData, creator: e.target.value })
       }
     />
     <TextField
       className={classes.textfield}
       name="title"
       variant="outlined"
       label="Title"
       fullWidth
       value={postData.title}
       onChange={(e) => setPostData({ ...postData, title: e.target.value })}
     />
     <TextField
       className={classes.textfield}
       name="message"
       variant="outlined"
       label="Message"
       fullWidth
       value={postData.message}
       onChange={(e) =>
         setPostData({ ...postData, message: e.target.value })
       }
     />
     <TextField
       className={classes.textfield}
       name="tags"
       variant="outlined"
       label="#HashTag"
       fullWidth
       value={postData.tags}
       onChange={(e) =>
         setPostData({ ...postData, tags: e.target.value.split(',') })
       }
     />
     <div className={classes.fileInput}>
       <FileBase
         type="file"
         className={classes.textfield}
         multiple={false}
         onDone={({ base64 }) =>
           setPostData({ ...postData, selectedFile: base64 })
         }
       />
     </div>
     <Button
       className={classes.buttonSubmit}
       variant="contained"
       color="primary"
       size="large"
       type="submit"
       fullWidth
     >
       Submit
     </Button>
     <Button
       variant="contained"
       color="secondary"
       size="small"
       onClick={clear}
       fullWidth
       style={{ marginTop: "3px" }}
     >
       Clear
     </Button>
   </form>
 </Paper>:null}</>
  );
};

export default Form;
