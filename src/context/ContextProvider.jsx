
import { combineComponents } from '../utils/CombineComponents';
import { StudentsProvider } from './StudentContext';
import { CourseProvider } from './CourseContext';

const providers = [
    StudentsProvider,
    CourseProvider
]
export const AppContextProvider = combineComponents(...providers);