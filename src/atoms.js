import { atom } from 'recoil';

export const userState = atom({ key: 'userState', default: {} });

export const teachersState = atom({ key: 'teachersState', default: [] });

export const studentsState = atom({ key: 'studentsState', default: [] });

export const lessonsState = atom({ key: 'lessonsState', default: [] });

export const viewState = atom({ key: 'viewState', default: 'Calendar' });
