import React, { useState, useEffect } from "react";
import { gql, useSubscription } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Container, CssBaseline, List, ListItemText, Typography } from "@mui/material";
import { signOut } from "../services/AuthService";

function ListToDos() {
    const navigate = useNavigate()
    const LIST_TODOS = gql`
        query MyQuery {
            listTodos {
                items {
                    done
                    name
                    id
                    desc
                }
            }
        }`
    
    const {
        loading: listLoading,
        data: listData,
        error: listError,
    } = useQuery(LIST_TODOS);

    const handleSignout = async () => {
        await await signOut()
        navigate('/login')
    }
    return (
        
        <div className="listToDos">
            
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
                    <h1>To Do List</h1>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {!listError ? 
                            !listLoading
                                ? listData.listTodos.items.map((todo) => (
                                        <ListItemText primary={todo.name} secondary={todo.desc} />
                                    )
                                )
                                : <p>Loading</p>
                        : listError?.message.includes("401") ?  <Navigate to="/login" replace={true} /> : "Error loading data"}
                    </List>
                     
                    <Button
                        onClick={handleSignout}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Out
                    </Button>
                </Box>
            </Container>
      </div>
    )
  }
  
  export default ListToDos;