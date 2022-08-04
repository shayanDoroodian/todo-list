import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const Alertcomp = ({ handleClose, text, severity }) => {
	return (
		<Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default Alertcomp;
