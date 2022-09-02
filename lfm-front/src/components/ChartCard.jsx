import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Divider from "@mui/material/Divider";

export default function ChartCard({chart, title, label}) {

    return <>
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <div style={{margin: 5}}> <Divider/> </div>
                <Box sx={{width: 'fit-content', margin: 'auto'}}>
                    <Paper elevation={1} sx={{padding: '5px'}}>
                        {label}
                    </Paper>
                </Box>
                {chart}
            </CardContent>
        </Card>
    </>
}