import React, {useState, useEffect} from 'react';
import {response} from '../response';

const SORT_BY_RANK = 'rank';
const SORT_BY_NAME = 'name';
const SORT_BY_POINT = 'points';
const SORT_BY_AGE = 'age';

function LeaderBoard(props) {
	const [ activeBtn, setActiveBtn ] = useState('');
	const [ list, setList ] = useState(response.list);

	function handleButtonClick(val) {
		setActiveBtn(val);
		let sorted = response.list;
		switch (val) {
			case SORT_BY_RANK:
				sorted = [...list].sort((a, b) => a.rank - b.rank);
				break;
			case SORT_BY_POINT:
				sorted = [...list].sort((a, b) => a.points - b.points);
				break;
			case SORT_BY_NAME:
				sorted = [...list].sort((a, b) => {
					return a.name.toLowerCase() < b.name.toLowerCase() ? -1: 1;
				});
				break;
			case SORT_BY_AGE:
				sorted = [...list].sort((a, b) => a.age - b.age);
				break;
			default:
				break;
		}
		setList(sorted);
	}

	useEffect(() => {
		const sortBy = window.location.pathname.substring(1);
		if (sortBy) {
			handleButtonClick(sortBy);	
		}
	}, []);

	return (
		<div className="text-center mt-50">
			<h3>LeaderBoard</h3>
			<div>
				<div> 
					<span>Sort By </span>
					<a href="/rank">
						<button className={activeBtn !== SORT_BY_RANK ? 'outlined': ''} type="button">Rank</button>
					</a>
					<a href="/points">
						<button className={activeBtn !== SORT_BY_POINT ? 'outlined': ''} type="button">Points</button>
					</a>
					<a href="/name">
						<button className={activeBtn !== SORT_BY_NAME ? 'outlined': ''} type="button">Name</button>
					</a>
					<a href="/age">
						<button className={activeBtn !== SORT_BY_AGE ? 'outlined': ''} type="button">Age</button>
					</a>
				</div>
			</div>
			<div className="card w-50 mx-auto pb-30">
		    <table className="mt-50">
		        <thead>
			        <tr>
		            <th className="numeric">Rank</th>
		            <th className="numeric">Points</th>
		            <th className="numeric">Name</th>
		            <th className="numeric">Age</th>
			        </tr>
		        </thead>
		        <tbody>
		        	{
		        		list.map((listItem) => {
		        			const { rank, points, name, age } = listItem;
		        			return (
		        				<tr key={rank}>
					            <td className="numeric">{rank}</td>
					            <td className="numeric">{points}</td>
					            <td className="numeric">{name}</td>
					            <td className="numeric">{age}</td>
						        </tr>
		        			)
		        		})
		        	}
		        </tbody>
		    </table>
			</div>
		</div>
	);
}

export default LeaderBoard;
