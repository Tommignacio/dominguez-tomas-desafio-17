import moment from "moment";

//crea un usauario a partir del esquema de usuarios para guardarlo en la DB
const formatUserForDB = (userObj) => {
	//recibe el parametro del middleware passport register
	const today = moment();

	const birthdate = moment(userObj.birthdate, "MMMM DD, YYYY").startOf("day");
	const userAge = today.diff(birthdate, "years");
	const newUser = {
		firstname: userObj.firstname,
		lastname: userObj.lastname,
		birthdate: birthdate.format("DD-MM-YYYY"),
		age: +userAge,
		email: userObj.email,
		password: userObj.password,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return newUser;
};

export default formatUserForDB;
