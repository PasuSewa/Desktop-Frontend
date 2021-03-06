import { FC } from "react"

import { Container, Grid, Typography } from "@material-ui/core"

import useStyles from "./styles"

import Skeleton from "@material-ui/lab/Skeleton"

const Loader: FC = () => {
	const classes = useStyles()

	return (
		<Container maxWidth="xl" className={classes.container} data-testid="test_loader_page">
			<Grid container justify="center" className={classes.centerAll} spacing={0}>
				<Grid item xs={12} md={6}>
					<Typography variant="h4" paragraph gutterBottom>
						Loading... Please wait...
					</Typography>

					<Skeleton animation="wave" />
					<Typography variant="h4" paragraph gutterBottom>
						Cargando... Por favor espere...
					</Typography>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Loader
