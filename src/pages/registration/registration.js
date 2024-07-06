import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { ACTION_TYPE } from "../../actions";
import { createUser } from "../../api";
import styles from "./registration.module.css";
import { useState } from "react";

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин")
		.matches(
			/^\w+$/,
			"Неверно заполнен логин. Допускаются только буквы и цифры",
		)
		.min(3, "Неверно заполнен логин. Минимум 3 символа")
		.max(15, "Неверно заполнен логин. Максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/[!@#$%^&*]/,
			"Неверно заполнен пароль. Необходимо наличие специального символа !@#$%^&*",
		)
		.min(6, "Неверно заполнен пароль. Минимум 3 символа")
		.max(30, "Неверно заполнен пароль. Максимум 30 символов"),
	passcheck: yup
		.string()
		.required("Заполните повтор пароля")
		.oneOf([yup.ref("password"), null], "Повтор пароля не совпадает"),
});
export const Registration = () => {
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: "", password: "" },
		resolver: yupResolver(regFormSchema),
		mode: "all",
	});
	const navigate = useNavigate();
	const onSubmit = (data) => {
		// Обработка отправки данных формы
		dispatch({ type: ACTION_TYPE.LOADING_START });
		createUser(data)
			.then((response) => {
				if (!response) {
					// Если статус не в диапазоне 200-299, считаем это ошибкой
					setServerError(`Ошибка: ${response.error}`);
					return;
				}
				localStorage.setItem("userLogin", response.userLogin);
				localStorage.setItem("userRole", response.userRole);
				localStorage.setItem("userSessionKey", response.userSessionKey);
				dispatch({ type: ACTION_TYPE.SET_USER, payload: response });
				navigate(`/orders`);
			})
			.catch((error) => {
				setServerError(`Ошибка: ${error}`);
			})
			.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
	};
	const errorMassege = errors.login?.message || serverError;
	return (
		<div className={styles.content}>
			<div className={styles.wrapper}>
				<h2 className={styles.nameForm}>Регистрация</h2>
				<form
					className={styles.authForm}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label>Логин:</label>
						<div className={styles.authInput}>
							<i className="bx bx-user"></i>
							<input
								type="text"
								placeholder="Логин..."
								{...register("login")}
								onChange={() => setServerError(null)}
							/>
						</div>
						<div className={styles.formErr}>
							{errorMassege && errorMassege}
						</div>
					</div>
					<div>
						<label>Пароль:</label>
						<div className={styles.authInput}>
							<i className="bx bx-lock-alt"></i>
							<input
								type="password"
								placeholder="Пароль..."
								{...register("password")}
								onChange={() => setServerError(null)}
							/>
						</div>
						<div className={styles.formErr}>
							{errors.password?.message}
						</div>
					</div>
					<div>
						<label>Подтверждение пароля:</label>
						<div className={styles.authInput}>
							<i className="bx bx-lock-alt"></i>
							<input
								type="password"
								placeholder="Пароль..."
								{...register("passcheck")}
								onChange={() => setServerError(null)}
							/>
						</div>
						<div className={styles.formErr}>
							{errors?.passcheck?.message}
						</div>
					</div>
					<button className={styles.btn} type="submit">
						Зарегистрироваться
					</button>
				</form>
			</div>
			<Link to="/authorization" className={styles.optionIcon}>
				авторизация
			</Link>
		</div>
	);
};
