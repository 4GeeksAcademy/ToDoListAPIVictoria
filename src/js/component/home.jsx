import React from "react";
import "../../styles/todostyles.css"

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TodoList } from "./todolist";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<TodoList />
		</div>
	);
};

export default Home;
