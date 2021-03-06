import { FC, ChangeEvent, useState } from "react"

import {
	Button,
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useMediaQuery,
	OutlinedInput,
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	Tooltip,
} from "@material-ui/core"

import useStyles from "./styles"
import { useTheme } from "@material-ui/core/styles"

import DeleteIcon from "@material-ui/icons/Delete"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../redux/store"

import { translate } from "../../../lang"

import useEditcodes from "./useEditcodes"

const EditCodes: FC<Props> = ({ codes, option, isCrypto }) => {
	const { lng } = useSelector((state: RootState) => state.lng)
	const { credential } = useSelector((state: RootState) => state.credential)

	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const classes = useStyles()
	const dispatch = useDispatch()
	const { editingCodes, setEditingCodes, removeCode } = useEditcodes({
		credential,
		dispatch,
		codes,
		isCrypto,
	})

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newArray = option === 1 ? [...codes] : [...editingCodes]

		const index = Number(e.target.id.substring(5))

		newArray[index] = e.target.value

		setEditingCodes(newArray)
	}

	if (option === 1) {
		return (
			<>
				<Grid item xs={12} className={classes.textCenter}>
					<Button
						size="large"
						color="primary"
						variant="contained"
						disableElevation
						onClick={handleClickOpen}
						data-testid="test_open_modal"
					>
						{translate("edit_codes", lng)}
					</Button>
				</Grid>
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={handleClose}
					aria-labelledby="edit-dialog"
					scroll="paper"
					data-testid="test_modal"
				>
					<DialogTitle id="edit-dialog">{translate("edit_codes", lng)}</DialogTitle>
					<DialogContent>
						<Grid container justify="space-around" spacing={4}>
							{codes.map((code: string, index: number) => (
								<Grid key={index} item xs={12} md={6}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel>{index + 1}</InputLabel>
										<OutlinedInput
											id={`${isCrypto ? "word" : "code"}-${index}`}
											label={`${index + 1}`}
											value={code}
											onChange={handleChange}
											endAdornment={
												<InputAdornment position="end">
													<Tooltip
														title={translate("delete", lng)}
														placement="top"
													>
														<IconButton
															aria-label={translate(
																"edit_codes",
																lng,
																2
															)}
															onClick={() => removeCode(code)}
														>
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												</InputAdornment>
											}
											inputProps={{
												"data-testid": `test_${index}`,
											}}
										/>
									</FormControl>
								</Grid>
							))}

							<Grid item xs={12} className={classes.textCenter}>
								<Button
									variant="outlined"
									color="primary"
									onClick={() => setEditingCodes([...codes, ""])}
								>
									{translate("edit_codes", lng, 1)}
								</Button>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="default">
							{translate("go_back", lng)}
						</Button>
						<Button onClick={handleClose} color="primary">
							{translate("access_management", lng, 2)}
						</Button>
					</DialogActions>
				</Dialog>
			</>
		)
	}

	return (
		<Grid container justify="space-around" spacing={4} data-testid="test_edit_codes">
			{editingCodes.map((code: string, index: number) => (
				<Grid key={index} item xs={12} md={6}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{index + 1}</InputLabel>
						<OutlinedInput
							id={`${isCrypto ? "word" : "code"}-${index}`}
							label={`${index + 1}`}
							value={code}
							onChange={handleChange}
							endAdornment={
								<InputAdornment position="end">
									<Tooltip title={translate("delete", lng)} placement="top">
										<IconButton
											aria-label={translate("edit_codes", lng, 2)}
											onClick={() => removeCode(code)}
										>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</InputAdornment>
							}
							inputProps={{
								"data-testid": `test_${index}`,
							}}
						/>
					</FormControl>
				</Grid>
			))}

			<Grid item xs={12} className={classes.textCenter}>
				<Button
					variant="outlined"
					color="primary"
					onClick={() => setEditingCodes([...editingCodes, ""])}
				>
					{translate("edit_codes", lng, 1)}
				</Button>
			</Grid>
		</Grid>
	)
}

type Props = {
	codes: string[]
	option: 1 | 2
	isCrypto: boolean
}

/**
 * @alias EditCodes
 *
 * @description This is the component responsible of managing the multiple codes property of a credential, receives the codes as an array, but here is the logic to update the codes on the global state.
 *
 * @property {string[]} codes The codes that will be rendered & dispatched to redux
 *
 * @property {1 | 2} option The layout for the codes (1: shows a button which opens a model. 2: shows every code inside an input)
 *
 * @property {boolean} isCrypto If the codes to edit are the words to access crypto currency wallets
 *
 * @example
 * 		<EditCodes codes={["", ""]} option={1} isCrypto />
 */

export default EditCodes
