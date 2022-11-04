import {
  Avatar,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../../services/api";
import { Post } from "../../../types/posts.types";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IndeterminateCheckBox } from "@mui/icons-material";
import { useAuth } from "../../../contexts/Auth";
import { deepOrange } from "@mui/material/colors";

export const Home = () => {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const { user } = useAuth();

  function srcset(
    image: string,
    width: number,
    height: number,
    rows = 3,
    cols = 3
  ) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  console.log(user);

  const fetchPosts = async () => {
    const apiPosts = (await api.get("/posts")).data;
    setPosts(apiPosts);
  };
  useEffect(() => {
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {window.innerWidth > 750 && (
        <Grid container={true} spacing={1}>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: "1%",
              marginRight: "3%",
              heigth: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* {user?.profilePicture && ( */}
            <Avatar src={user?.profilePicture} sx={{ width: 56, height: 56 }}>
              
            </Avatar>
            {/* )} */}
            {/* {!user?.profilePicture && (
              <Avatar sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}>
                
              
              </Avatar>
            )} */}
          </Grid>

          <Grid item sx={{ height: "100%", marginTop: "3%", margin: 0 }}>
            {posts && (
              <ImageList
                sx={{ width: "100%", height: "95%", margin: 0 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
                gap={3}
              >
                {posts.map((post, index) => {
                  return (
                    <ImageListItem
                      key={`${post.postTitle}${index}`}
                      cols={1}
                      rows={3}
                    >
                      <img
                        {...srcset(post.postImage, 150, 100, 2, 2)}
                        alt={`${post.postTitle}${index}`}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        sx={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        }}
                        title={post.postTitle}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: "white" }}
                            aria-label={`star ${post.postTitle}`}
                          >
                            <StarBorderIcon />
                          </IconButton>
                        }
                        actionPosition="left"
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            )}
          </Grid>
        </Grid>
      )}
      {window.innerWidth < 750 && (
        <Grid
          sx={{
            height: "80%",
            boxShadow: "0 -1px 40px 0 black",
          }}
        >
          {posts && (
            <ImageList
              sx={{
                width: "100%",
                height: "100%",
                margin: 0,
              }}
              variant="quilted"
              cols={1}
              rowHeight={121}
              gap={3}
            >
              {posts.map((post, index) => {
                return (
                  <ImageListItem
                    key={`${post.postTitle}${index}`}
                    cols={3}
                    rows={3}
                  >
                    <img
                      {...srcset(post.postImage, 150, 100, 2, 2)}
                      alt={`${post.postTitle}${index}`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                      }}
                      title={post.postTitle}
                      position="top"
                      actionIcon={
                        <IconButton
                          sx={{ color: "white" }}
                          aria-label={`star ${post.postTitle}`}
                        >
                          <StarBorderIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}
        </Grid>
      )}
    </>
  );
};
