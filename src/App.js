import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import {
	faChevronRight,
	faChevronLeft,
	faCircle,
	faCheckCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(0);

	const handleClickAddItem = () => {
		if(!inputValue) {
			alert("名前を入力してください。");
			return;
		}
		const newItem = {
			id: uuidv4(),
			itemName: inputValue,
			quantity: 1,
			isSelected: false
		};

		const newItems = [...items, newItem];
		setItems(newItems);
		setInputValue('');
	}

	const toggleComplete = (id) => {
		const Items = [...items];
		const newItems = Items.map(item => {
			if (item.id === id) {
				item.isSelected = !item.isSelected;
			}
			return item;
		});
		setItems(newItems);
	}

	const handleQuantityIncrease = (id) => {
		const Items = [...items];
		const newItems = Items.map(item => {
			if (item.id === id) {
				item.quantity++;
			}
			return item;
		});
		setItems(newItems);
	};

	const handleQuantityDecrease = (id) => {
		const Items = [...items];
		const  newItems = Items.filter(item => {
			if (item.id !== id) {
				return item;
			}

			item.quantity--;
			return (item.quantity > 0);
		});

		setItems(newItems);
	};

	useEffect(() => {
		const totalItemCount = items.reduce((total, item) => {
			const sum = total + item.quantity;
			return (sum > 0) ? sum : 0;
		}, 0);

		setTotalItemCount(totalItemCount);
	}, [items]);

	return (
		<div className="app-background">
			<div className="main-container">
				<div className="add-item-box">
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className="add-item-input" placeholder="Add an item..." />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleClickAddItem()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div key={item.id} className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(item.id)}>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
										<>
											<FontAwesomeIcon icon={faCircle} />
											<span>{item.itemName}</span>
										</>
									)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(item.id)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(item.id)} />
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="total">Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;