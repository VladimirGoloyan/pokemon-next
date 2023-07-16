import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {Box, Card, Container, Grid, Link, Typography} from "@mui/material";
import locale from "../utils/locale";
import {baseUrls, formatString, getAllPokemon} from "../utils/utils";

const sxClasses = {
    card: {
        p: 2,
    },
    link: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}

export async function getStaticProps() {
    const resp = await getAllPokemon()

    return {
        props: {
            pokemon: resp,
        },
    };
}

export default function Home({pokemon}) {
    return (
        <Container className={styles.container}>
            <Head>
                <title>{locale.listTitle}</title>
            </Head>
            <Typography variant={"h2"}>{locale.listTitle}</Typography>
            <Grid className={styles.grid}>
                {pokemon.map((pokemon) => (
                    <Grid item className={styles.card} key={pokemon.id}>
                        <Card sx={sxClasses.card}>
                            <Link color={'inherit'} underline={'none'} href={`/pokemon/${pokemon.id}`}
                                  sx={sxClasses.link}>
                                <Typography variant={'h4'}>{pokemon.name}</Typography>
                                <Box
                                    component='img'
                                    src={formatString(baseUrls.pokemonImage, pokemon.image)}
                                    alt={pokemon.name}
                                />
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
