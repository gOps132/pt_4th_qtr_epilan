import dynamic from 'next/dynamic';

import home_styles from '../styles/Home.module.css';
import common_styles from '../styles/Common.module.css';
import image_styles from "../styles/Image.module.css";
import Loader from "../components/loader";

const Profile = dynamic(() => import(`../components/home/dyn_images`),
	{ loading: () => <Loader/>}
);

const date_of_birth = new Date("03/26/2006");
const month_diff = (Date.now() - date_of_birth.getTime());

var age_dt = new Date(month_diff); 
//extract year from date    
var year = age_dt.getUTCFullYear();
//now calculate the age of the user
var v_age = Math.abs(year - 1970);

const Home = () => {
	return (
		<div className={common_styles.main_div}>
			<div className={home_styles.main_profile}>
				<div className={image_styles.image_border_circle}>
					<Profile />
				</div>
				<div>
					<h3>Name: Epilan Gian Cedrick G.</h3>
					<h3>Age: {v_age}</h3>
					<h3>Born: March 26, 2006</h3>
				</div>
			</div>
		</div>
	);

};

export default Home;