/* eslint-disable react/prop-types */
import { Grid, Card, Avatar, Typography, Box, useTheme, alpha } from "@mui/material";
import { Person, Group, LibraryBooks, Security } from "@mui/icons-material";

const StatsCards = ({ stats }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.dark, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                mr: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                color: theme.palette.primary.main,
              }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.users}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.secondary.dark, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                mr: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.2),
                color: theme.palette.secondary.main,
              }}
            >
              <Group />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Roles
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.roles}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)}, ${alpha(theme.palette.info.dark, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                mr: 2,
                bgcolor: alpha(theme.palette.info.main, 0.2),
                color: theme.palette.info.main,
              }}
            >
              <LibraryBooks />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Pages
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.pages}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)}, ${alpha(theme.palette.success.dark, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                mr: 2,
                bgcolor: alpha(theme.palette.success.main, 0.2),
                color: theme.palette.success.main,
              }}
            >
              <Security />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Permissions
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.permissions}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsCards;