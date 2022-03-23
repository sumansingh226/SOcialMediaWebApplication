import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import { getPosts } from "../../redux/actions/posts";
import Posts from "../Posts/Posts";
import useStyle from "./styles";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid, Button } from "@material-ui/core";

const Home = () => {
  const [CurrentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [CurrentId, dispatch]);

  const classes = useStyle();
  return (
    <div>
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
              <Posts  setCurrentId={setCurrentId} />
            </Grid>
              <Grid item xs={12} sm={4}>
                <Form CurrentId={CurrentId} setCurrentId={setCurrentId} />
              </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
