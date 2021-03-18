import React, { useState, FC } from "react"

import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	TextField,
	Tooltip,
	Backdrop,
	CircularProgress,
} from "@material-ui/core"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"

import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import StepThree from "../RegisterSteps/StepThree"

import { secretKey4Testing, user4Testing } from "../../../misc/Data4Testing"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
		borderRadius: {
			borderRadius: 10,
		},
		marginTop: {
			marginTop: "3rem",
		},
	})
)

const AccessManagement: FC = () => {
	const { lng } = useSelector((state: RootState) => state.lng)

	const [locked, setLocked] = useState(true)

	const [loading, setLoading] = useState(false)

	const classes = useStyles()

	const tooltipTitle = translate("access_management", lng, locked ? 1 : 2)

	const callApi = () => {
		// here we'll call the api either to get the decrypted data, or to send the new data

		setLoading(true)

		setTimeout(() => {
			setLocked(!locked)

			setLoading(false)
		}, 3000)
	}

	return (
		<>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Grid item xs={12} md={6} lg={8}>
				<Card className={classes.borderRadius} elevation={2}>
					<CardHeader
						title={translate("access_management", lng, 0)}
						action={
							<Tooltip title={tooltipTitle} placement="right">
								<IconButton color="primary" onClick={callApi}>
									{locked ? <LockIcon /> : <LockOpenIcon />}
								</IconButton>
							</Tooltip>
						}
					/>
					<CardContent>
						<Grid container justify="space-between" spacing={4}>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 6)}
									name="name"
									type={locked ? "password" : "text"}
									defaultValue={user4Testing.name}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 7)}
									name="phoneNumber"
									type={locked ? "password" : "text"}
									defaultValue={user4Testing.phone_number}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 2)}
									name="mainEmail"
									type={locked ? "password" : "email"}
									defaultValue={user4Testing.email}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 3)}
									name="recoveryEmail"
									type={locked ? "password" : "email"}
									defaultValue={user4Testing.recovery_email}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									label={translate("auth_form_texts", lng, 4)}
									name="antiFishing"
									type={locked ? "password" : "text"}
									defaultValue={user4Testing.anti_fishing_secret}
									disabled={locked}
									fullWidth
								/>
							</Grid>
							{!locked && (
								<Grid item xs={12} className={classes.marginTop}>
									<StepThree
										isRobot={false}
										alter={{
											email: user4Testing.email,
											secretKey: secretKey4Testing,
										}}
									/>
								</Grid>
							)}
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</>
	)
}

export default AccessManagement