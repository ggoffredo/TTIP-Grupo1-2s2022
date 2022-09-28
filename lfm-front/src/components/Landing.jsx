import './Landing.css'
import Grid from "@mui/material/Grid";
import Typewriter from 'typewriter-effect/dist/core';
import {useEffect} from "react";

const Landing = () => {

    const setAndStartTypewriter = () => {
        let tw = new Typewriter("#typewriter", {
            strings: ['gastos', 'ingresos', 'inversiones'],
            autoStart: true,
            loop: true
        })
        tw.start()
    }

    useEffect(() => {
        setAndStartTypewriter()
    }, [])

    return <Grid container className="Container">
        <Grid container className="landingBackground">
            <Grid container direction="column" justifyContent="center " xs={6} sx={{padding: '20px'}}>
                <Grid item>
                    <p>Bienvenido a</p>
                </Grid>
                <Grid item>
                    <p id="pageName">llegar a fin de mes</p>
                </Grid>
                <Grid container direction="row" justifyContent="left">
                    <Grid item>
                        <p style={{marginRight: '0.50rem'}}>donde podrás gestionar</p>
                    </Grid>
                    <Grid item>
                        <p id="typewriter" className="landingTitle"/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default Landing