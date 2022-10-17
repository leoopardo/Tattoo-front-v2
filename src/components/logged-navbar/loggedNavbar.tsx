import { Avatar, Box, Button, ButtonGroup, Fab, Grid } from "@mui/material";
import { ColorButton } from "../../pages/public/signin/signin";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatIcon from "@mui/icons-material/Chat";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";

export const LoggedNavbar = () => {
  const buttons = [
    <ColorButton key="Profile" startIcon={<AccountBoxIcon />}>
      Profile
    </ColorButton>,
    <ColorButton key="Chat" startIcon={<ChatIcon />}>
      Chat
    </ColorButton>,
    <ColorButton key="NewPost" startIcon={<AddAPhotoIcon />}>
      New post
    </ColorButton>,
    <ColorButton key="Schedule" startIcon={<DateRangeIcon />}>
      Schedule
    </ColorButton>,
    <></>,
  ];
  return (
    <>
      <Grid
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <ButtonGroup
          sx={{ width: "500px", height: "100%" }}
          orientation="vertical"
          color="inherit"
          variant="text"
        >
          {buttons}
        </ButtonGroup>

        <Button color="error">Log out</Button>
      </Grid>
    </>
  );
};

export const MobileLoggedNavbar = () => {
  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
        <Fab variant="extended">
          <NavigationIcon sx={{ mr: 1 }} />
          Navigate
        </Fab>
        <Fab disabled aria-label="like">
          <Avatar></Avatar>
        </Fab>
      </Box>
    </>
  );
};
