import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import { getPosts } from "../../redux/actions/posts";
import Posts from "../Posts/Posts";
import useStyle from "./styles";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Button } from "@material-ui/core";

const Home = () => {
  const [CurrentId, setCurrentId] = useState(null);
  const [showForm, setshowForm] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [CurrentId, dispatch]);

  const handleForm = () => {
    setshowForm((prevState) => !prevState);
  };
  const classes = useStyle();
  return (
    <div>
      <div style={{ margin: "3px 3px", textAlign: "right" }}>
        <Button onClick={handleForm} variant="contained">
          Post
        </Button>
      </div>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spaceing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setshowForm={setshowForm} setCurrentId={setCurrentId} />
            </Grid>
            {showForm ? (
              <Grid item xs={12} sm={4}>
                <Form CurrentId={CurrentId} setCurrentId={setCurrentId} />
              </Grid>
            ) : null}
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
