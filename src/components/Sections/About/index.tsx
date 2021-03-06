import { FC } from "react"

import { Container, Grid, Typography, Hidden, Divider } from "@material-ui/core"

import useStyles from "./styles"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import * as es from "../../../lang/es.json"

import DialogComponent from "../../UI-Components/Dialog"

const About: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const classes = useStyles()

	return (
		<>
			<Container maxWidth="xl" className={classes.container} data-testid="test_about">
				<Grid container justify="space-around">
					<Grid item xs={12} className={(classes.marginB, classes.textCenter)}>
						<Typography gutterBottom variant="h4" className={classes.marginB}>
							{translate("about_title", lng)}
						</Typography>
					</Grid>
					<Grid item xs={12} className={classes.marginB}>
						<Divider orientation="horizontal" />
					</Grid>
					<Grid item xs={12} sm={5} className={classes.marginB}>
						<Typography variant="body1" className={classes.marginB}>
							{translate("about_texts", lng, 0)}
						</Typography>
						<Typography variant="body1">{translate("about_texts", lng, 1)}</Typography>
					</Grid>
					<Hidden xsDown>
						<Divider orientation="vertical" flexItem className={classes.marginB} />
					</Hidden>
					<Grid item xs={12} sm={5} className={classes.marginB}>
						<Typography variant="body1" className={classes.marginB}>
							{translate("about_texts", lng, 2)}
						</Typography>
						<Typography variant="body1" paragraph>
							{translate("about_subtitle", lng)}
						</Typography>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 3)}"
							<Typography
								component="span"
								variant="body2"
								className={classes.primaryColor}
							>
								{translate("encryption_examples", lng, 0)}
							</Typography>
							". {translate("about_texts", lng, 4)}"
							<Typography
								component="span"
								variant="body2"
								className={classes.primaryColor}
							>
								{translate("encrypted_examples", lng, 0)}
							</Typography>
							".
						</Typography>
						<Typography variant="body2">{translate("about_texts", lng, 5)}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
				</Grid>
				<DialogComponent
					className={classes.infoBtn}
					title={translate("about_subtitle", lng)}
					tooltipPlacement="left"
				>
					<>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 3)}"
							<Typography
								component="span"
								variant="body2"
								className={classes.primaryColor}
							>
								{translate("encryption_examples", lng, 0)}
							</Typography>
							"{". "}
							{translate("about_texts", lng, 4)}"
							<Typography
								component="span"
								variant="body2"
								className={classes.primaryColor}
							>
								{translate("encrypted_examples", lng, 0)}
							</Typography>
							".
						</Typography>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 6)}
						</Typography>
						<Typography variant="body2" paragraph>
							{translate("about_texts", lng, 7)}
						</Typography>
						<ol>
							{es.encryption_examples.map((element, index) => (
								<li key={index}>
									<span>
										"
										<Typography
											component="span"
											variant="body2"
											className={classes.primaryColor}
										>
											{translate("encryption_examples", lng, index)}
										</Typography>
										" {"=>"} "
										<Typography
											component="span"
											variant="body2"
											className={classes.primaryColor}
										>
											{translate("encrypted_examples", lng, index)}
										</Typography>
										",
									</span>
								</li>
							))}
						</ol>
					</>
				</DialogComponent>
			</Container>
		</>
	)
}

export default About
