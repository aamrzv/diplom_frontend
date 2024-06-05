import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../../actions";
import { selectIsServerError } from "../../selectors";

export const Modal = () => {
	const serverError = useSelector(selectIsServerError);
	const dispatch = useDispatch();
	useEffect(() => {
		if (serverError) {
			alert(serverError);
			dispatch({
				type: ACTION_TYPE.SET_SERVER_ERROR,
				payload: false,
			});
		}
	}, [serverError, dispatch]);
	return <></>;
};
