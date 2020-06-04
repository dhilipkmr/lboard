import React from 'react';
import App from './App';
import 'jest-dom/extend-expect';
import {response} from './response';
import {render, fireEvent, cleanup, within, wait} from '@testing-library/react';

const RANK_BUTTON_INDEX = 0;
const POINTS_BUTTON_INDEX = 1;
const NAME_BUTTON_INDEX = 2;
const AGE_BUTTON_INDEX = 3;
const TOTAL_BUTTONS = 4;
const TOTAL_ROWS = response.list.length;
const list = response.list;
const SORT_BY_RANK = [...list].sort((a,b) => a.rank - b.rank);
const SORT_BY_POINTS = [...list].sort((a,b) => a.points - b.points);
const SORT_BY_AGE = [...list].sort((a,b) => a.age - b.age);
const SORT_BY_NAME = [...list].sort((a, b) => {
	return a.name.toLowerCase() < b.name.toLowerCase() ? -1: 1;
});

describe('LeaderBoard', () => {

		function validateSortByRank(container, SORT_BY) {
			const tbody = container.querySelector('tbody');
			const tChild = tbody.children;
			for (let i = 0; i < TOTAL_ROWS; i++) {
				const {rank, points, name, age} = SORT_BY[i];
				const tdAll = tChild[i].querySelectorAll('td');
				expect(tdAll[RANK_BUTTON_INDEX].textContent).toEqual(rank);
				expect(tdAll[POINTS_BUTTON_INDEX].textContent).toEqual(points);
				expect(tdAll[NAME_BUTTON_INDEX].textContent).toEqual(name);
				expect(tdAll[AGE_BUTTON_INDEX].textContent).toEqual(age);
			}
		}

    afterEach(() => {
        cleanup();
    });

    it('should render the table' , () => {
    	const {container} = render(<App/>);
 			const table = container.querySelectorAll('table')[0];
 			expect(table).toBeInstanceOf(HTMLElement);
 			const tbody = table.querySelector('tbody');
 			expect(tbody).toBeInstanceOf(HTMLElement);
 			expect(tbody.children.length).toEqual(TOTAL_ROWS);
 			const allBtn = container.querySelectorAll('button[class=outlined]');
 			expect(allBtn.length).toEqual(TOTAL_BUTTONS);
    });

    it ('should Navigate to Correct Route on button click', async () => {
    	const {container} = render(<App />);
    	let allBtn = container.querySelectorAll('button');
			fireEvent.click(allBtn[RANK_BUTTON_INDEX]);
			// Page goes to a new url after above click, now I have to 
			// check this new URL if that if '/rank' or not but it is returning '/'
			expect(window.location.pathname).toEqual('/rank');

			// allBtn = container.querySelectorAll('button');			
 			// 	fireEvent.click(allBtn[POINTS_BUTTON_INDEX]);
			// expect(window.location.pathname).toEqual('/points');

			// allBtn = container.querySelectorAll('button');			
 			// 	fireEvent.click(allBtn[NAME_BUTTON_INDEX]);
			// expect(window.location.pathname).toEqual('/name');

			// allBtn = container.querySelectorAll('button');			
 			// 	fireEvent.click(allBtn[AGE_BUTTON_INDEX]);
			// expect(window.location.pathname).toEqual('/age');
    });

   //  it ('should Highlight Correct button on button click', () => {
   //  	const {container} = render(<App />);
			// let allBtn = container.querySelectorAll('button');
			// fireEvent.click(allBtn[RANK_BUTTON_INDEX]);
			// allBtn = container.querySelectorAll('button');			
			// expect(allBtn[RANK_BUTTON_INDEX].className).toEqual('');
			// expect(allBtn[POINTS_BUTTON_INDEX].className).toEqual('outlined');
 		// 	expect(allBtn[NAME_BUTTON_INDEX].className).toEqual('outlined');
 		// 	expect(allBtn[AGE_BUTTON_INDEX].className).toEqual('outlined');

 		// 	fireEvent.click(allBtn[POINTS_BUTTON_INDEX]);
			// allBtn = container.querySelectorAll('button');			
			// expect(allBtn[RANK_BUTTON_INDEX].className).toEqual('outlined');
			// expect(allBtn[POINTS_BUTTON_INDEX].className).toEqual('');
 		// 	expect(allBtn[NAME_BUTTON_INDEX].className).toEqual('outlined');
 		// 	expect(allBtn[AGE_BUTTON_INDEX].className).toEqual('outlined');

 		// 	fireEvent.click(allBtn[NAME_BUTTON_INDEX]);
			// allBtn = container.querySelectorAll('button');			
			// expect(allBtn[RANK_BUTTON_INDEX].className).toEqual('outlined');
			// expect(allBtn[POINTS_BUTTON_INDEX].className).toEqual('outlined');
 		// 	expect(allBtn[NAME_BUTTON_INDEX].className).toEqual('');
 		// 	expect(allBtn[AGE_BUTTON_INDEX].className).toEqual('outlined');

 		// 	fireEvent.click(allBtn[AGE_BUTTON_INDEX]);
			// allBtn = container.querySelectorAll('button');			
			// expect(allBtn[RANK_BUTTON_INDEX].className).toEqual('outlined');
			// expect(allBtn[POINTS_BUTTON_INDEX].className).toEqual('outlined');
 		// 	expect(allBtn[NAME_BUTTON_INDEX].className).toEqual('outlined');
 		// 	expect(allBtn[AGE_BUTTON_INDEX].className).toEqual('');
   //  });

   //  it ('should Sort by Rank', () => {
			// const {container} = render(<App/>);
   //  	const allBtns = container.querySelectorAll('button');
			// fireEvent.click(allBtns[RANK_BUTTON_INDEX]);
			// validateSortByRank(container, SORT_BY_RANK);
   //  });

   //  it ('should Sort by Points', () => {
			// const {container} = render(<App/>);
   //  	const allBtns = container.querySelectorAll('button');
			// fireEvent.click(allBtns[POINTS_BUTTON_INDEX]);
			// validateSortByRank(container, SORT_BY_POINTS);
   //  });

   //  it ('should Sort by Name', () => {
			// const {container} = render(<App/>);
   //  	const allBtns = container.querySelectorAll('button');
			// fireEvent.click(allBtns[NAME_BUTTON_INDEX]);
			// validateSortByRank(container, SORT_BY_NAME);
   //  });

   //  it ('should Sort by Age', () => {
			// const {container} = render(<App/>);
   //  	const allBtns = container.querySelectorAll('button');
			// fireEvent.click(allBtns[AGE_BUTTON_INDEX]);
			// validateSortByRank(container, SORT_BY_AGE);
   //  });
});

