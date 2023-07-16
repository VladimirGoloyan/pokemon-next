import React from "react";
import Head from "next/head";
import styles from "../../styles/Details.module.css";
import {baseUrls, formatString, getAllPokemon, getOnePokemon} from "../../utils/utils";
import locale from "../../utils/locale";
import {Box, Container, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

export async function getStaticPaths() {
  const pokemon = await getAllPokemon();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pokemonInfo = await getOnePokemon(params.id);

  return {
    props: {
      pokemon: pokemonInfo,
    },
    // revalidate: 30,
  };
}

export default function Details({ pokemon }) {
  return (
    <Container>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <Box>
        <Link underline="none" color='inherit' href="/">
          {locale.backText}
        </Link>
      </Box>
      <Box className={styles.layout}>
          <img
            className={styles.picture}
            src={formatString(baseUrls.pokemonImage, pokemon.image)}
            alt={pokemon.name.english}
          />
        <Box>
          <Typography className={styles.name}>{pokemon.name}</Typography>
          <Typography className={styles.type}>{pokemon.type.join(", ")}</Typography>
          <Table>
            <TableHead className={styles.header}>
              <TableRow>
                <TableCell>{locale.name}</TableCell>
                <TableCell>{locale.value}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemon.stats.map(({ name, value }) => (
                <TableRow key={name}>
                  <TableCell className={styles.attribute}>{name}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
}
