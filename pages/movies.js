import { useRouter } from "next/router";

import Loader from "../components/loader";
import Image from "next/image";

import common_styles from "../styles/Common.module.css";
import movie_styles from "../styles/Movie.module.css";

const Movies = (props) => {
	const router = useRouter();
	if (router.isFallback) {
		return (<Loader />)
	}
	return (
		<div className={common_styles.main_div}>
			{(!props.err ?
				<>
					{(process && process.env.NODE_ENV === 'development') ? console.log(props.imdb_data) : <></>}
					<h1>Favorite Movies</h1>
					<ul className={movie_styles.list}>
						{props.imdb_data.items.map((i, t) => {
							return (
								<div key={t} className={movie_styles.media_img}>
									<Image
										src={i.image}
										width={200}
										height={250}
									/>
								</div>
							)
						})}
					</ul>
				</> : <h1>Fetch or Server Error, reload for more info</h1>)
			}
		</div>
	)
}

export async function getStaticProps() {
	let res = await fetch(`${process.env.SERVER_URL}/api/imdb`, { method: "GET" })

	if (res.status === 204 || res.status > 400) {
		return {
			props: {
				err: true
			}
		}
	}

	let data = await res.json();

	return {
		props: {
			samp: "samp_string",
			imdb_data: data,
			err: false
		},
		revalidate: 60
	};
};

export default Movies;