const fs = require("fs");
const sizeOf = require('image-size');

import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router'

import Loader from "../components/loader";

import image_style from "../styles/Image.module.css";
import common_style from "../styles/Common.module.css";

const Memes = (props) => {
	const router = useRouter();
	
	if (router.isFallback) {
		return <Loader />
	}
	return (
		<div className={common_style.main_div}>
			<h1>Memes that I like</h1>
			<div className={image_style.image_container}>
				{props.main_obj.files.map((i, t) => {
					return (
						<div className={image_style.image_container_margin} key={t}>
							<Image
								className={image_style.image_self}
								width={i.width}
								height={i.height}
								src={`/img/memes/${i.filename}`}
								layout="intrinsic"
								placeholder={<Loader />}
							/>
						</div>
					)
				})}
				{/* DEBUG */}
				{console.log(props.main_obj)}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	let img_obj = {
		files: [],
	}

	let image_names = fs.readdirSync("public/img/memes");
	console.log(image_names);
	for (let i = 0; i < image_names.length; i++) {
		let tmp;
		let m_width = (tmp = sizeOf(`public/img/memes/${image_names[i]}`).width / 1.5, ((t) => { if (t > 800) { tmp = tmp / 1.5 } })(tmp), tmp);
		let m_height = (tmp = sizeOf(`public/img/memes/${image_names[i]}`).height / 1.5, ((t) => { if (t > 600) { tmp = tmp / 1.5 } })(tmp), tmp)
		img_obj.files.push({
			filename: image_names[i],
			width: Math.round(m_width),
			height: Math.round(m_height),
		});
	}

	img_obj.files.sort((a, b) => {
		return (a.width * a.height) - (b.width * b.height);
	});

	return {
		props: {
			main_obj: img_obj
		},
		revalidate: 60
	}
}

export default Memes;