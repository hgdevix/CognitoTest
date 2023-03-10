import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { completeNewPass, login } from '../services/AuthService';
import { useNavigate, Link  } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let user = await login(data.get('email'),data.get('password'))
        if(user.challengeName === "NEW_PASSWORD_REQUIRED") {
            let newPass = await window.prompt("Please enter a new password")

            await completeNewPass(user, newPass)
        }

        navigate('/')
    };

  return (

    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item>
                <Link to={"/signup"}>
                    {"Need an account? Sign Up!"}
                </Link>
            </Grid>
        </Grid>
        </Box>
    </Box>
    </Container>
  );
}