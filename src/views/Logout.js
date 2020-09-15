import { useEffect } from 'react';
import { userState, viewState } from '../atoms';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
export default function Logout() {
	const setView = useSetRecoilState(viewState);
	const setUser = useSetRecoilState(userState);

	useEffect(() => {
		axios.get('/logout').catch((err) => console.log(err));
		setView('Login');
		setUser({});
	});
	return null;
}
