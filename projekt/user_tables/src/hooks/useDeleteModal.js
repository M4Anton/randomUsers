import { useState } from 'react';

const useDeleteModal = () =>{
	const [isVisible, setVisible] = useState(false);

	function trigger(){
		setVisible(!isVisible);
	}

	return {
		isVisible,
		trigger
	}
};

export default useDeleteModal;