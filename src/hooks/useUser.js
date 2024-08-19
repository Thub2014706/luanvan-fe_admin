import { useSelector } from 'react-redux';

const useUser = () => {
    return useSelector((state) => state.auth.login.currentUser);
};

export default useUser;